import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../services/axiosService";
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap'

function AddSlider() {

    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');

    const [fnameError, setfnameError] = useState('');
    const [lnameError, setlnameError] = useState('');
    const [fileError, setfileError] = useState('');

    const [selectedFile, setSelectedFile] = useState();
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleValidation = (event) => {
        let formIsValid1 = true;
        let formIsValid2 = true;
        let formIsValid3 = true;

        if (fname === "") {
            setfnameError("please enter title");
            formIsValid1 = false;
        } else {
            setfnameError("");
            formIsValid1 = true;

        }

        if (lname === "") {
            setlnameError("please enter sub title");
            formIsValid2 = false;
        } else {
            setlnameError("");
            formIsValid2 = true;

        }

        if (selectedFile === undefined) {
            setfileError("please select Image");
            formIsValid3 = false;
        } else {
            setfileError("");
            formIsValid3 = true;

        }


        if(formIsValid1===true && formIsValid2===true && formIsValid3===true ){
            return true;
        }else{
           return false
        }
       
    };

    const handelSubmit = async (e) => {

        if (handleValidation() === true) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            await axios.post('/file/upload-images', formData)
                .then(async (res) => {

                    if (res.data.status === true) {

                        const reqBodyImage = {
                            title: fname,
                            subtitle:lname,
                            image:res.data.path.url
                        }

                        await axios.post('/api/create-slider', reqBodyImage)
                            .then(async (res) => {

                                if (res.data.status === true) {
                                    toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                                } else {
                                    toast.warn('try again', { position: toast.POSITION.TOP_RIGHT })
                                }

                            }).catch((error) => {

                            })

                    } else {
                        toast.warn('try again', { position: toast.POSITION.TOP_RIGHT })
                    }

                }).catch((error) => {

                })
        }else{
            toast.warn('Please enter valid details', { position: toast.POSITION.TOP_RIGHT })
        }

    }
    

    return (
        <>
           
            <Row className="">
                <Col lg={12} md={12} sm={12} className="shadow-sm rounded-lg test-left p-5">

                    <h3 className="dashboard">Create Slider</h3>
                    <hr></hr>

                    <Card className=" p-5 mt-2 ml-2">
                        <Card.Body>

                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >Title<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setfname(e.target.value)} type="text" placeholder="Enter title" />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {fnameError}
                                        </small>
                                        
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicLastName">
                                            <Form.Label>Sub Title<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e=>setlname(e.target.value)} type="text" placeholder="Enter sub title" />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {lnameError}
                                        </small>
                                        
                                    </div>
                                </div>

                                <div className='row pt-5'>
                                    <div className="col-lg-12 md-6 xs-12">
                                        <Form.Group controlId="formBasicLastName">
                                            <Form.Label>Select Image<span className="text-danger">*</span></Form.Label>
                                            <input type="file" name="file" onChange={changeHandler} />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {fileError}
                                        </small>
                                        
                                    </div>
                                    
                                </div>

                                <Col className="text-end mt-5">
                                    <Link className="edit-link" path="/show-all-users"
                                        to="/">
                                        <Button className="editBtn" variant="info" >Back</Button>
                                    </Link>{' '}
                                   
                                    <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" >
                                        Save
                                    </Button>

                                </Col>

                            <ToastContainer />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        
        </>
    );
}

export default AddSlider