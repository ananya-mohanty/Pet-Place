import React, { Component } from 'react';
import {
    MessageBox,
    ChatItem,
    ChatList,
    SystemMessage,
    MessageList,
    Input,
    Button,
    Avatar,
    Navbar,
    SideBar,
    Dropdown,
    Popup,
    MeetingList,
} from 'react-chat-elements';
import {Container, Row, Col} from 'reactstrap'
import 'react-chat-elements/dist/main.css';
import { connect } from 'react-redux';
import axios from 'axios';
import {getMessages, addMessage} from '../actions/chatAction'
import PropTypes from 'prop-types'

const styleparent = {
    width: 400,
    overflow: 'hidden',
    position: 'absolute',
    marginRight: 20,
    height: 500,
    marginRight: 10
}

const styleparent1 = {
    width: 450,
    overflow: 'hidden',
    position: 'absolute',
    height: 500,
    
}

const stylechild = {
    backgroundColor: '#e5e4e2',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: -20,
    right: -20, 
    overflow: 'scroll',
    marginTop: 120, 
    borderStyle:"solid", 
    borderWidth: 1, 
    borderColor: "rgba(0,0,0,0.1)",
    marginLeft: 20
}

export class ChatPage extends Component {

    state = {
        chatSource: [{
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
        {
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
        {
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
        {
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
        {
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        }],

        messageList: [{
            position: 'right',
            type: 'text',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
        },
        {
            position: 'right',
            type: 'text',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
        },
        {
            position: 'right',
            type: 'text',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
        }],
        msg: ''
    }

    onChange = (e) => {
        this.setState({msg: {
            position: 'right',
            type: 'text',
            text: e.target.value,
            date: new Date()
        }})
    }

    addMessage = (e) => {
        this.setState({messageList: [...this.state.messageList, this.state.msg]})
        this.setState({msg: ''})
        this.inputRef.clear()
    }

    inputRef = React.createRef();

    render() {

        return (
            <Container style={{marginBottom: 650}}><Row><Col>
                    <div style={styleparent}>
                        <div style={stylechild}>
                        <div style={{height: 45, width: '100%', position:'sticky', padding: 10, backgroundColor: '#009ACD', color: 'white'}}>&nbsp; All chats</div>
                            <ChatList
                                dataSource={this.state.chatSource} />
                        </div></div></Col>

                <Col><div style={styleparent1}><div style={stylechild}
                    className='right-panel'>
                    <div style={{height: 50, backgroundColor: 'white', marginBottom: 20}}></div><MessageList
                        className='message-list'
                        lockable={true}
                        downButtonBadge={10}
                        dataSource={this.state.messageList} />
                    <div style={{marginTop: 330, width: '100%', position:'sticky'}}>
                    <Input
                        placeholder="Write a message.."
                        defaultValue=""
                        ref='input'
                        multiline={true}
                        name='msg'
                        ref={el => (this.inputRef = el)}
                        onChange = {this.onChange}
                        rightButtons={
                            <Button
                                text='Send'
                                onClick={this.addMessage} />
                        } />
                </div></div></div></Col>
            </Row>
            </Container>
        );
    }
}

ChatPage.propTypes = {
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired
}

export default connect(null, {getMessages, addMessage})(ChatPage);