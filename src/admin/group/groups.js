import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
// import {Avatar, Card, Col, Row} from 'antd';
import React from 'react';
import {Button, Col, Card, Row, CardHeader, CardTitle, CardBody, CardText, CardColumns, CardDeck} from "reactstrap";
import Search from "antd/es/input/Search";
import {useState} from "react";
import {getGroupContent} from "../../store/reducer/data";
import {connect} from "react-redux";
import {useNavigate} from "react-router";


function Groups({data, getSectionData, onSearch, toggleUpdate, deleteSectionItem, toggle, sectionName, groupContent, getGroupContent}) {

    console.log("group data", data)
    const {update, headers, info, body} = data
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    function convertDate(timestamp) {
        const date = new Date(timestamp);
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
    }

    function deleteGroupUser(userId, groupId){
        alert(`user: ${userId} group: ${groupId}`)
    }

    function handleGroupContent(groupId) {
        navigate("/dashboard/group-content", {state: {groupId: groupId}})
        getGroupContent(groupId);
        return <groupContent data={groupContent} onSearch={onSearch} toggleUpdate={toggleUpdate} deleteGroupUser={deleteGroupUser}/>
    }

    return (
        <div>
            <Row style={{marginBottom: 20}}>
                <Col>
                    {update ? <Button color='success' onClick={() => toggle(sectionName)}>
                        &#10009; Add {sectionName}
                    </Button> : ''}
                </Col>
                <Col sm={{size: 1, offset: 4}}>
                    {
                        search && <Button color='warning' className='text-white' onClick={() => {
                            getSectionData(0);
                            setSearch("")
                        }}>Clear</Button>
                    }
                </Col>
                <Col sm={4}>
                    <Search placeholder="Search..." onSearch={onSearch} enterButton/>
                </Col>
            </Row>
            <Row lg={4}>
                {body && body.content ? body.content.map(content => {
                    return (
                        <Col sm="6">
                            <Card
                                onClick={() => handleGroupContent(content.id)}
                                className="my-2"
                                color="primary"
                                outline
                                style={{
                                    width: '20rem',
                                    height: '14rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <CardHeader>
                                    Group: {content.name}
                                </CardHeader>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Gender: {content.gender}
                                    </CardTitle>
                                    <CardText>
                                        Starts at: {convertDate(content.startDate)}
                                    </CardText>
                                    <CardText>
                                        Group size: {content.membersCount}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                }) : ''
                }
            </Row>
        </div>)
}

export default connect(({data: {groupContent}}) => ({groupContent}), {getGroupContent})(Groups);
