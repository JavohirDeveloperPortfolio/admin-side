import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
// import {Avatar, Card, Col, Row} from 'antd';
import React from 'react';
import {Button, Col, Card, Row, CardHeader, CardTitle, CardBody, CardText, CardColumns, CardDeck} from "reactstrap";
import Search from "antd/es/input/Search";
import {useState} from "react";

const {Meta} = Card;

const Groups = ({data, getSectionData, onSearch, toggleUpdate, deleteSectionItem, toggle, sectionName}) => {

    console.log("group data", data)
    const {update, headers, info, body} = data
    const [search, setSearch] = useState("")

    function convertDate(timestamp){
        const date = new Date(timestamp);
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
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
            {/*// <Row gutter={16}>*/}
            {/*//     {body.content.map(content => {*/}
            {/*//         return (*/}
            {/*//             <Col>*/}
            {/*//                 <Card*/}
            {/*//                     style={{*/}
            {/*//                         width: 300,*/}
            {/*//                     }}*/}
            {/*//                     cover={*/}
            {/*//                         <img*/}
            {/*//                             alt="example"*/}
            {/*//                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/}
            {/*//                         />*/}
            {/*//                     }*/}
            {/*//                     actions={[*/}
            {/*//                         <SettingOutlined key="setting"/>,*/}
            {/*//                         <EditOutlined key="edit"/>,*/}
            {/*//                         <EllipsisOutlined key="ellipsis"/>,*/}
            {/*//                     ]}*/}
            {/*//                 >*/}
            {/*                    <Meta*/}
            {/*                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}*/}
            {/*                        title="Card title"*/}
            {/*                        description={content.name}*/}
            {/*                    />*/}
            {/*                </Card>*/}
            {/*            </Col>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</Row>*/}
            <Row lg={4}>
                {body.content.map(content => {
                    return (
                        <Col sm="6">
                            <Card
                                onClick={() => alert("Hello world")}
                                className="my-2"
                                color="primary"
                                outline
                                style={{
                                    width: '14rem',
                                    cursor:'pointer'
                                }}
                            >
                                <CardHeader>
                                    Group:  {content.name}
                                </CardHeader>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Gender:  {content.gender}
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
                })
                }
            </Row>
        </div>)
}

export default Groups;
