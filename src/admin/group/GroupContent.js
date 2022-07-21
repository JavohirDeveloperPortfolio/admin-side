import {Button, Col, Row} from "reactstrap";
import {useEffect, useState} from "react";
import Search from "antd/es/input/Search";
import {getGroupContent} from "../../store/reducer/data";
import {connect} from "react-redux";
import {useLocation} from "react-router";

const GroupContent = ({groupContent, getGroupContent}) => {

    const {update, headers, info, body} = groupContent
    const {state} = useLocation();
    const [search, setSearch] = useState("")

    useEffect(() => {
        getGroupContent(state.groupId)
    }, [])

    useEffect(() => {
        console.log("group Content", groupContent)
    }, [groupContent])

    function deleteGroupUser(id){

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
                                    <Button color="secondary" className="m-1" onClick={() => toggleUpdate(elm.id)}>
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
        </div>
    );
}

export default connect(({data: {groupContent}}) => ({groupContent}), {getGroupContent}) (GroupContent);