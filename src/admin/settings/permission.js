import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Checkbox, Switch} from "antd";
import "./permission.css";
import {API_BASE_URL} from "../../utils/constants";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";


function Permission({
                        menuList
                    }) {
    const BASE_URL = `${API_BASE_URL}/user/admin/section`;
    const [sections, setSections] = useState([]);
    const [data, setData] = useState({content: []});
    const [switchStatus, setSwitchStatus] = useState([]);
    const [newState, setNewState] = useState(false);
    const [currentSection, setCurrentSection] = useState(menuList[0].sectionName)
    const navigate = useNavigate();

    useEffect(function () {
        axios.get(`${BASE_URL}/get`, {headers: {Authorization: localStorage.getItem("access-token")}}).then(res => {
            if (res.data.statusCode === 200) {
                setSections(res.data.data);
                axios.get(`${BASE_URL}/get/${res.data.data[0].id}`, {
                    headers:
                        {Authorization: localStorage.getItem("access-token")}
                }).then(res => {
                    if (res.data.statusCode === 200) {
                        setData(res.data.data);
                    }
                })
            }
        });

    }, [])

    const onChange = (id) => {
        axios.get(`${BASE_URL}/get/${id}`, {headers: {Authorization: localStorage.getItem("access-token")}}).then(res => {
            console.log("id", id, " data", res);
            if (res.data.success) {
                const content = res.data.data;
                console.log("content", content);
                console.log("...", {...content})
                setData({...content});
                setNewState(false);
            }
            else throw Error("Permission denied")
        }).catch(err => {
            toast.error(err.message, {autoClose: 1000})
            navigate("/")
        })
            setCurrentSection(menuList.filter(menu => menu.id === id).map(menu => menu.sectionName)[0])
    }


    const switchBtnOnChange = (id, i) => {
        switchStatus[id] = !switchStatus[id];
        setSwitchStatus([...switchStatus]);
        console.log("switchStatus on change", switchStatus);
        data.content[i].permissions.visibility = !data.content[i].permissions.visibility;
        setData({...data});
        setNewState(true);
    }

    const saveBtnOnclick = () => {
        // console.log("switchStatus", switchStatus)
        // switchStatus.forEach((el, i) => data.content[i].permissions.visibility = switchStatus[i]);
        // console.log("data", data)
        setNewState(false);
        axios.post(`${BASE_URL}/edit`, data, {headers: {Authorization: localStorage.getItem("access-token")}}).then(resp => {
                console.log("response", resp)
                if (resp.status === 200) {
                    toast.success("Permissions updated successfully", {autoClose: 1000})
                }
                else {
                    throw new Error("Permissions update failed");
                }
            }
        ).catch((err) => {toast.error(err.message, {autoClose: 1000})})
    }

    const handleChange = (ordinal, key) => {
        console.log("ordinal", ordinal)
        console.log("data", data)
        data.content[ordinal - 1].permissions[key] = !data.content[ordinal - 1].permissions[key];
    }

    useEffect(()=>{

    }, [data])


    return (

        <div>
            <ul className={"nav nav-navbar"}>
                {
                    sections.map((section) => <ol key={section.id}>
                            <button className={currentSection && currentSection === section.sectionName ? 'p-2 pb-2 rounded bg-primary my-1 border-primary' : 'p-2 pb-2 rounded my-1 border-primary'} onClick={() => onChange(section.id)}>
                                {section.sectionName}
                            </button>
                        </ol>
                    )
                }
            </ul>
            <div>
                <table className={"table table-primary table-bordered table-hover"}>
                    <thead>
                    <tr>
                        <th>Role</th>
                        <th>Visibility</th>
                        <th>Update</th>
                        <th>Delete</th>
                        <th>Info</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.content.map((perm, i) => <tr key={perm.ordinal}>
                            <td>{perm.roleName}</td>
                            <td>
                                <Switch
                                    defaultChecked={newState && perm.permissions.visibility} onClick={() => {
                                    switchBtnOnChange(perm.ordinal - 1, i)
                                }}/>
                            </td>
                            <td>
                                <Checkbox
                                    disabled={!switchStatus[perm.ordinal - 1]}
                                    defaultChecked={perm.permissions.update} onClick={() => {
                                    handleChange(perm.ordinal, "update")
                                }}/>
                            </td>
                            <td>
                                <Checkbox
                                    disabled={!switchStatus[perm.ordinal - 1]}
                                    defaultChecked={perm.permissions.delete} onChange={() => {
                                    handleChange(perm.ordinal, "delete")
                                }}/>
                            </td>
                            <td>
                                <Checkbox
                                    disabled={!switchStatus[perm.ordinal - 1]}
                                    defaultChecked={perm.permissions.info} onChange={() => {
                                    handleChange(perm.ordinal, "info")
                                }}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <Button type="primary" block onClick={saveBtnOnclick}> Save</Button>

            </div>
        </div>
    )
}

export default Permission;