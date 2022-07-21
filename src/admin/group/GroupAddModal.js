import React, {useState, useEffect} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import axios from "axios";
import {DatePicker, Select, Space} from "antd";
import {Option} from "antd/es/mentions";
import {API_BASE_URL} from "../../utils/constants";

const GroupAddModal = ({ toggle, getSectionData, courseId}) => {


    const [groupData, setGroupData] = useState({});
    const [courseList, setCourseList] = useState();
    const BASE_URL =`${API_BASE_URL}/course`;

    function handleSubmit() {
        console.log(groupData)
        axios.post(`${API_BASE_URL}/group/add`, groupData, {headers: {Authorization: localStorage.getItem("access-token")}}).then((res) => {
            console.log(res)
            clearInput()
            getSectionData(0)
        }).catch((err) => {
            console.log(err)
        })
        toggle("group")
    }

    useEffect(() => {
        console.log("course id", courseId)
        // console.log(`${BASE_URL}/list?size=500`)
        axios.get(`${API_BASE_URL}/user/admin/section/data?id=${courseId}`, {headers: {Authorization: localStorage.getItem("access-token")}}).then((res) => {
            console.log(res.data)
            if (res.data.success) {
                setCourseList(res.data.data.body.content);
            }
        })
    }, [])

    function clearInput() {
        setGroupData({});
    }

    function handleSelect(value){
        groupData.gender = value;
        setGroupData({...groupData});
    }

    const handleDate = (date, dateString) => {
        groupData.startDate = dateString;
        setGroupData({...groupData});
    }

    const handleCourseOption = (value) => {
        groupData.courseId = value;
        setGroupData({...groupData});
    }

    return (
        <div>
            <Modal isOpen={true} toggle={() => toggle("group")}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="groupName">Name: </Label>
                            <Input type="text" name="name" id="groupName" placeholder="Enter a group name"
                                   onChange={(e) => {
                                       groupData.name = e.target.value;
                                       setGroupData({...groupData})
                                   }}
                                   value={groupData.name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="groupMemberCount">MemberCount: </Label>
                            <Input type="number" name="membersCount" id="groupMemberCount"
                                   placeholder="Enter a number of members"
                                   onChange={(e) => {
                                       groupData.membersCount = e.target.value;
                                       setGroupData({...groupData});
                                   }}
                                   value={groupData.membersCount}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="type">Gender: </Label>
                                <Select
                                    defaultValue="SELECT GENDER"a
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleSelect}
                                >
                                    <Option value="MALE" key={"MALE"}>Male</Option>
                                    <Option value="FEMALE" key={"FEMALE"}>Female</Option>
                                </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="startDate">Start date: </Label>
                            <Space direction="vertical">
                                <DatePicker onChange={handleDate} />
                            </Space>
                        </FormGroup>

                        <FormGroup>
                            <Label for="courseList">Courses: </Label>
                            <Select
                                defaultValue="Select a course"
                                style={{
                                    width: 200,
                                }}
                                onChange={handleCourseOption}
                            >
                                {courseList && courseList.map(course => {
                                    return <Option value={course.id} key={course.id}>{course.name}</Option>
                                })}

                            </Select>
                        </FormGroup>

                        <Col sm={{size: 8, offset: 8}}>
                            <Button color="secondary" onClick={() => {
                                toggle("group")
                                clearInput()
                            }}>Cancel</Button>
                            <Button color={"danger"} className={"float-right mx-1"}
                                    onClick={handleSubmit}>Submit</Button>
                        </Col>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default GroupAddModal