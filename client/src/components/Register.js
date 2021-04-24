import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { register, registerngo } from '../actions/authAction'

import logo from '../images/logo_fetch.jpeg'

const InputStyle={
    borderStyle: "solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)", backgroundColor: "white", opacity: '80%', color:'black'
}

const divStyle={
    padding: 20, marginTop: '2%', borderRadius:'20px',borderStyle: "solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)", backgroundColor: "rgba(255, 255, 255,0.8)"
}

const btnStyle={
    opacity: '90%', borderRadius: '25px', height: '50px', width: '100px', padding: '0px'
}

const centerStyle={
    display: 'flex', alignContent: 'center', justifyContent: 'center'
}

export class Register extends Component {
    state = { userform: false, ngoform: false, showform: false, 
        username:'', password:null, email:null,
        contact:'', hno:'', state:'', street:'',pincode:'',city:''
        }

            
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    userReg = (e) =>{
        e.preventDefault()
        const {username, email, password}=this.state
        // console.log(username, email, password)
        this.props.register({'name':username, 'email':email, 'password':password})
    }

    ngoReg = (e) =>{
        e.preventDefault()
        const { username, email, password, contact } = this.state
        const address={
            'hno':this.state.hno,
            'state':this.state.state,
            'street': this.state.street,
            'pincode': this.state.pincode,
            'city': this.state.city,
        }
        this.props.registerngo({ 'name': username, 'email': email, 'password': password, 'contact':contact, 'address':address })
    }
    render() {
        return (
                <Container style={{
                    alignSelf: 'center',
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                        <div style={centerStyle}>
                            <img src={logo} style={{ height: 120, marginTop: '5%' }}></img><br></br>

                        </div>
                        {!this.state.showForm? 
                        <div>

                            <div style={centerStyle}>
                                <Button onClick={() => this.setState({ showForm: true, userForm:true })} className='register' >
                                    Register As User</Button>
                            </div>
                                <div style={centerStyle}>
                                <Button onClick={() => this.setState({ showForm: true , ngoForm:true})} className='register' >Register As NGO</Button>
                            </div>
                        </div>
                        :null}
                        {this.state.userForm ? <div style={divStyle}>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input onChange={this.onChange} style={InputStyle} type="string" name="username" id="username" placeholder="jonh doe" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input onChange={this.onChange} style={InputStyle} type="email" name="email" id="email" placeholder="jdoe@gmail.com" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input onChange={this.onChange} style={InputStyle} type="password" name="password" id="password" placeholder="*********" />
                                </FormGroup>
                                <Row style={{ alignContent: 'center', justifyContent: 'center' }}>

                                    <Button className='register' style={ btnStyle} onClick={this.userReg}>Register</Button>

                                </Row>
                            </Form>
                        </div> : this.state.ngoForm ? <div style={ divStyle}>
                                <Form onSubmit={this.onSubmit} style={{width: '800px'}}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="username">Username</Label>
                                                <Input onChange={this.onChange} style={InputStyle} type="string" name="username" id="username" placeholder="john doe" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input onChange={this.onChange} style={InputStyle} type="email" name="email" id="email" placeholder="jdoe@gmail.com" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <Input onChange={this.onChange} style={InputStyle} type="password" name="password" id="password" placeholder="********" />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="contact">Contact</Label>
                                                <Input onChange={this.onChange} style={InputStyle} type="string" name="contact" id="contact" placeholder="9988776543" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="">Address</Label>
                                                <Row>
                                                    <Col>
                                                        <Label for="hno">Building</Label>
                                                        <Input onChange={this.onChange} style={InputStyle} type="string" name="hno" id="hno" placeholder="B-123" />
                                                    </Col>
                                                    <Col>
                                                        <Label for="hno">Street</Label>
                                                        <Input onChange={this.onChange} style={InputStyle} type="string" name="street" id="street" placeholder="8th Street" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Label for="hno">City</Label>
                                                        <Input onChange={this.onChange} style={InputStyle} type="string" name="city" id="city" placeholder="Ukiah"  />
                                                    </Col>
                                                    <Col>
                                                        <Label for="hno">State</Label>
                                                        <Input onChange={this.onChange} style={InputStyle} type="string" name="state" id="state" placeholder="California"  />
                                                    </Col>
                                                    <Col>
                                                        <Label for="hno">Pincode</Label>
                                                        <Input onChange={this.onChange} style={InputStyle} type="string" name="pincode" id="pincode" placeholder="95482" />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignContent:'center', justifyContent:'center'}}>

                                        <Button className='register' style={btnStyle} onClick={this.ngoReg}>Register</Button>

                                    </Row>
                                </Form>
                        </div> :null }
                        </Col>
                        <Col>
                        </Col>
                    </Row>

                </Container>
            
        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    registerngo: PropTypes.func.isRequired,
}

export default connect(null, { register, registerngo })(Register)