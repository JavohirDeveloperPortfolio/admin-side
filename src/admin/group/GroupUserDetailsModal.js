import React, {useState, useEffect} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Card,
    CardHeader,
    CardBody, CardTitle, CardText, Button, Col
} from 'reactstrap';
const GroupUserDetailsModal = ({ toggleInfo, userDetails}) => {

    useEffect(() => {

    }, [])

    return (
        <div>
            {
                userDetails ? <Modal isOpen={true} toggle={() => toggleInfo()}>
                    <ModalHeader>Modal title</ModalHeader>
                    <ModalBody>
                        <Card
                            className="my-2"
                            color="primary"
                            outline
                            style={{
                                width: '14rem',
                                cursor: 'pointer'
                            }}
                        >
                            <CardHeader>
                                User Id: {userDetails.id}
                            </CardHeader>
                            <CardBody>
                                <CardTitle tag="h5">
                                    User Full Name: {userDetails.firstName} {userDetails.lastName} {userDetails.middleName}
                                </CardTitle>
                                <CardText>
                                    Gender: {userDetails.gender}
                                </CardText>
                                <CardText>
                                    Passport: {userDetails.passport}
                                </CardText>
                            </CardBody>
                        </Card>
                        <Col sm={{size: 8, offset: 8}}>
                            <Button color="secondary" onClick={() => {
                                toggleInfo()
                            }}>Cancel</Button>
                        </Col>
                    </ModalBody>
                </Modal> : ''
            }
        </div>
    )
}

export default GroupUserDetailsModal