import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import {toast} from "react-toastify";


const CourseAddModal = ({toggle, addCourse}) => {
    const [courseData, setCourseData] = useState({});

    function handleSubmit() {
        if (courseData.name && courseData.price && courseData.description && courseData.duration) {
            addCourse(courseData)
        } else toast.warn('You need to fill all blanks', {autoClose: 1500})
        toggle("course")
    }

    function clearInput() {
        setCourseData({});
    }

    return (
        <div>
            <Modal isOpen={true} toggle={() => toggle("course")}>
                <ModalHeader>Add new Course: </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="courseName">Name: </Label>
                            <Input type="text" name="name" id="courseName" placeholder="Enter a course name"
                                   onChange={({target: {value}}) => {
                                       setCourseData({...courseData, name: value})
                                   }}
                                   value={courseData.name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="courseDescription">Description: </Label>
                            <Input type="textarea" name="description" id="courseDescription"
                                   placeholder="Enter a course description"
                                   onChange={({target: {value}}) => {
                                       setCourseData({...courseData, description: value});
                                   }}
                                   value={courseData.description}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="coursePrice">Price: </Label>
                            <Input type="number" name="price" id="coursePrice"
                                   placeholder="Enter a course price"
                                   onChange={({target: {value}}) => {
                                       setCourseData({...courseData, price: value});
                                   }}
                                   value={courseData.price}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="courseDuration">Duration: </Label>
                            <Input type="number" name="duration" id="courseDuration"
                                   placeholder="Enter a course duration"
                                   onChange={({target: {value}}) => {
                                       setCourseData({...courseData, duration: value})
                                   }}
                                   value={courseData.duration}
                            />
                        </FormGroup>
                        <Col sm={{size: 8, offset: 8}}>
                            <Button color="secondary" onClick={() => {
                                toggle("course");
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