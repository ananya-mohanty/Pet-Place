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
    // marginLeft:'180px',
    overflow: 'hidden',
    position: 'absolute',
    height: 570,
    width:'100%',
    textAlign: 'center'
}

const stylechild = {
    height:'570px',
    width:'800px',
    backgroundColor: '#e5e4e2',
    overflow: 'scroll',
    borderStyle:"solid", 
    borderWidth: 1, 
    borderColor: "rgba(0,0,0,0.1)",
    margin: 'auto',
    marginTop:'100px',
    textAlign: 'left'
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
            const arr = messageList[key]
            var title
            if(arr[arr.length-1].position=='left')
                title = arr[arr.length - 1].sender
            else title = arr[arr.length - 1].receiver
            const { subtitle } = arr[arr.length - 1]
            var date = arr[arr.length - 1].updatedAt
            var avatar = `url(${avatar_img})`
            const alt = key
            const unread = 0
            this.state.chatSource.push({ title, subtitle, avatar,alt, unread , date})
        }
        this.state.chatSource.sort((m1, m2) => { return new Date(m2.date).getTime() - new Date(m1.date).getTime();})
    }

    componentDidUpdate = () => {
        this.props.getMessageList()
        const messageList = this.props.chat.messageList
        this.state.chatSource=[]
        for(var key in messageList)
        {
            const arr = messageList[key]
            var title
            if (arr[arr.length - 1].position == 'left')
                title = arr[arr.length - 1].sender
            else title = arr[arr.length - 1].receiver
            const { subtitle } = arr[arr.length - 1]
            var date = new Date(arr[arr.length - 1].updatedAt)
            var avatar = `url(${avatar_img})`
            const alt = key
            const unread = 0
            this.state.chatSource.push({ title, subtitle, avatar,alt, unread, date })
        }
        this.state.chatSource.sort((m1, m2) => { return new Date(m2.date).getTime() - new Date(m1.date).getTime(); })

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
                            dataSource={this.state.chatSource} onClick={(e) => { window.location.href = `/chat/${e.alt}`}}/>
                        </div></div></Col>

                {/* <Col><div style={styleparent1}><div style={stylechild}
                    className='right-panel'>
                        <ChatPanel user1={this.state.chatopen}/>
                    </div></div></Col> */}
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