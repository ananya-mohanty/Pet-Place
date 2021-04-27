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
import avatar_img from '../images/resources/forum-author1.png'
import {getMessages, addMessage, getMessageList} from '../actions/chatAction'
import PropTypes from 'prop-types'
import  ChatPanel  from '../components/ChatPanel';

const styleparent = {
    width: 400,
    overflow: 'hidden',
    position: 'absolute',
    marginRight: 20,
    height: 540,
    marginRight: 10
}

const styleparent1 = {
    width: 450,
    overflow: 'hidden',
    position: 'absolute',
    height: 540,
    
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
        chatopen: null,
        chatSource: [],

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

    componentDidMount=()=>{
        this.props.getMessageList()
        const messageList=this.props.chat.messageList
        this.state.chatSource = []
        for (var key in messageList) {
            const arr1 = messageList[key].filter((m)=>{return m.position=='left'})
            const { title } = arr1[arr1.length - 1]
            const arr = messageList[key]
            const { subtitle } = arr[arr.length - 1]
            var date = arr[arr.length - 1].updatedAt
            var avatar = `url(${avatar_img})`
            const alt = key
            const unread = 0
            this.state.chatSource.push({ title, subtitle, avatar,alt, unread , date})
        }
    }

    componentDidUpdate = () => {
        this.props.getMessageList()
        const messageList = this.props.chat.messageList
        this.state.chatSource=[]
        for(var key in messageList)
        {
            const arr1 = messageList[key].filter((m) => { return m.position == 'left' })
            const { title } = arr1[arr1.length - 1]
            const arr = messageList[key]
            const { subtitle } = arr[arr.length - 1]
            var date = new Date(arr[arr.length - 1].updatedAt)
            var avatar = `url(${avatar_img})`
            const alt = key
            const unread = 0
            this.state.chatSource.push({ title, subtitle, avatar,alt, unread, date })
        }
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
                        <div style={{height: 45, width: '100%', position:'sticky', top: 0, padding: 10, backgroundColor: '#009ACD', color: 'white'}}>&nbsp; All chats</div>
                            <ChatList
                                dataSource={this.state.chatSource} onClick={(e)=>{this.setState({chatopen:e.alt})}}/>
                        </div></div></Col>

                <Col><div style={styleparent1}><div style={stylechild}
                    className='right-panel'>
                        <ChatPanel user1={this.state.chatopen}/>
                    </div></div></Col>
            </Row>
            </Container>
        );
    }
}

ChatPage.propTypes = {
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    getMessageList: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    chat: state.chat,
})
export default connect(mapStateToProps, {getMessages, addMessage, getMessageList})(ChatPage);