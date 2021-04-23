import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../images/logo_fetch.jpeg'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import PropTypes from 'prop-types'
import { login } from '../actions/authAction'

export class LoginRegister extends Component {

    state = {
        email: '',
        password: '',
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.login(this.state)
    }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col style={{textAlign: 'center'}}>
                    <img src={logo} style={{height: 100, marginTop: "40%"}}></img>
                    </Col>
                    <Col><div style={{padding:20, marginTop: "25%", borderStyle:"solid", borderWidth: 1, borderColor: "rgba(0,0,0,0.1)",}}>
                    <Form onSubmit={this.onSubmit}>
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

LoginRegister.propTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(null, { login })(LoginRegister)