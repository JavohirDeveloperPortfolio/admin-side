import {Button, Col, Row} from "reactstrap";
import {useEffect, useState} from "react";
import Search from "antd/es/input/Search";
import {getGroupContent} from "../../store/reducer/data";
import {connect} from "react-redux";
import {useLocation} from "react-router";
import GroupUserDetailsModal from "./GroupUserDetailsModal";
import {getUserDetails} from "../../store/reducer/user";

const GroupContent = ({groupContent, getGroupContent, userDetails, getUserDetails}) => {

    const {update, headers, info, body} = groupContent
    const {state} = useLocation();
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getGroupContent(state.groupId)
    }, [])

    useEffect(() => {
        console.log("group Content", groupContent)
    }, [groupContent])

    function deleteGroupUser(id){

    }

    function toggleInfo(id){
        getUserDetails(id);
        setOpen(!open)
    }


    function toggleUpdate(){

    }

    function onSearch(item){

    }

    return (
        <div className="container">
            <Row style={{marginTop:20}}>
                <Col sm={{size: 2, offset: 6}} >
                    {
                        search && <Button color='warning' className='text-white' onClick={() => {
                            setSearch("")
                        }}>Clear</Button>
                    }
                </Col>
                <Col sm={4}>
                    <Search placeholder="Search..." onSearch={onSearch} enterButton/>
                </Col>
            </Row>
            <table className={"table mt-4 table-bordered table-hover table-striped"}>
                <thead>
                <tr>
                     <th>#id</th>
                     <th>Phone Number</th>
                     <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {groupContent && groupContent.length > 0 ? groupContent.map(elm => {
                    return <tr key={elm.id}>
                         <td>{elm.id}</td>
                         <td>{elm.phoneNumber}</td>
                        {
                           <td>
                                {
                                    <Button color="secondary" className="m-1" onClick={() => toggleInfo(elm.id)}>
                                        &#10066;
                                    </Button>
                                }
                                {
                                 <Button color="danger" onClick={() => deleteGroupUser(elm.id)}>
                                        &#10006;
                                    </Button>
                                }
                            </td>
                        }
                    </tr>
                }) : ''}
                </tbody>
            </table>
            {open ? <GroupUserDetailsModal toggleInfo={toggleInfo} userDetails={userDetails}/> : ''}
        </div>
    );
}

export default connect(({data: {groupContent}, user: {userDetails}}) => ({groupContent, userDetails}), {getGroupContent, getUserDetails}) (GroupContent);