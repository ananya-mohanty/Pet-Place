import React, { Component } from 'react'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Container
} from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { register } from '../actions/authAction'


export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        hno: '',
        city: '',
        state: '',
        pincode: ''
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { username, email, password, hno, city, state, pincode } = this.state
        const newUser = {
            username, email, password, address: { hno, city, state, pincode }
        }
        this.props.register(newUser)
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                    <div style={{padding:20, marginTop: "25%", borderStyle:"solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)",}}>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input onChange={this.onChange} style={{borderStyle:"solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)",}} type="text" name="name" id="name" placeholder="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input onChange={this.onChange} style={{borderStyle:"solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)",}} type="email" name="email" id="email" placeholder="e-mail" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input onChange={this.onChange} style={{borderStyle:"solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)",}} type="password" name="password" id="password" placeholder="password" />
                        </FormGroup>
                        <Button style={{marginTop: 30, marginLeft: "40%"}} onClick={this.onSubmit}>Login</Button>
                        </Form></div>
                    </Col>
                    <Col>
                    <div style={{padding:20, marginTop: "25%", borderStyle:"solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)",}}>
                        <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input onChange={this.onChange} style={{borderStyle:"solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)",}} type="text" name="name" id="name" placeholder="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input onChange={this.onChange} style={{borderStyle:"solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)",}} type="email" name="email" id="email" placeholder="e-mail" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input onChange={this.onChange} style={{borderStyle:"solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)",}} type="password" name="password" id="password" placeholder="password" />
                        </FormGroup>
                        <Button style={{marginTop: 30, marginLeft: "40%"}} onClick={this.onSubmit}>Login</Button>
                        </Form></div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
}

export default connect(null, { register })(Register)