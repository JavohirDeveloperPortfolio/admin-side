import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import axios from "axios";


const CourseAddModal = ({isOpen, toggle, getSectionData, setSearch}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [duration, setDuration] = useState("")

    const [courseData, setCourseData] = useState({});

    function handleSubmit() {
        // let data = {
        //     name,
        //     description,
        //     price,
        //     duration
        // }

        let data = {
            ...courseData
        }


        axios.post("http://localhost:9000/api/v1/course/add", data, {headers: {Authorization: localStorage.getItem("accessToken")}}).then((res) => {
            console.log(res)
            toggle()
            clearInput()
            getSectionData(0)
        }).catch((err) => {
            console.log(err)
        })
    }

    function clearInput() {
        // setName("")
        // setDescription("")
        // setPrice(0)
        // setDuration(0)
        setCourseData({});
    }

    const onSearch = (value) => {
        setSearch(value)

        axios.get(`http://localhost:9000/api/v1/course/get?name=${value}`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then((res) => {
            if (res.data.status) {
                console.log(res.data.data)
                setCourseData([{
                    ...res.data.data
                }])
            }
        }).catch((err) => {
            console.log(err)
        })
    };


    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>Modal title</ModalHeader>
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

export default CourseAddModal