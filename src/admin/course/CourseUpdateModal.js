import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import axios from "axios";


const CourseUpdateModal = ({toggle, isOpen, getCourse, updatingModal}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [duration, setDuration] = useState("")

    function handleUpdate() {
        let data = {
            name,
            description,
            price,
            duration
        }
        axios.put(`http://localhost:8081/api/course/update/${updatingModal}`, data).then((res) => {
            if (res.data.status) {
                console.log(res)
                console.log("Successfully updated")
                toggle()
                getCourse(0)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getOneCourse(updatingModal);
    }, [updatingModal])

    function getOneCourse(id) {
        axios.get(`http://localhost:9000/api/v1/course/get/${id}`).then((res) => {
            console.log(res.data, "Update Modal Get one course")
            if (res.data.status) {
                setName(res.data.data.name)
                setDescription(res.data.data.description)
                setDuration(res.data.data.duration)
                setPrice(res.data.data.price)
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="courseName">Name</Label>
                            <Input type="text" name="name" id="courseName" placeholder="Enter a course name"
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}
                                   value={name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="courseDescription">Description</Label>
                            <Input type="textarea" name="description" id="courseDescription"
                                   placeholder="Enter a course description"
                                   onChange={(e) => {
                                       setDescription(e.target.value)
                                   }}
                                   value={description}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="coursePrice">Price</Label>
                            <Input type="number" name="price" id="coursePrice"
                                   placeholder="Enter a course price"
                                   onChange={(e) => {
                                       setPrice(e.target.value)
                                   }}
                                   value={price}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="courseDuration">Duration</Label>
                            <Input type="number" name="duration" id="courseDuration"
                                   placeholder="Enter a course duration"
                                   onChange={(e) => {
                                       setDuration(e.target.value)
                                   }}
                                   value={duration}
                            />
                        </FormGroup>
                        <Col sm={{size: 8, offset: 8}}>
                            <Button color="secondary" onClick={() => {
                                toggle();
                            }}>Cancel</Button>
                            <Button color={"danger"} className={"float-right mx-1"}
                                    onClick={handleUpdate}>Update</Button>
                        </Col>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default CourseUpdateModal;