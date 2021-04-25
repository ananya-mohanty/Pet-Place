import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MessageList, Input, Button } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'
import axios from 'axios'
import {getMessages, addMessage} from '../actions/chatAction'
import PropTypes from 'prop-types'

export class ChatPanel extends Component {

    state= {
        msg: {},
        msgList: []
    }

    componentDidMount=()=>{
        this.props.getMessages(this.props.user1)
        const userMessages = this.props.chat.userMessages
        console.log(userMessages)
        userMessages.map((msg)=>{
            const{position, type, text}=msg
            const date=new Date(msg.updatedAt)
            this.state.msgList.push({position, type, text, date})
        })
        console.log(this.state.msgList)
        this.scrollRef.scrollIntoView({ behavior: 'smooth' })
    }
    
    componentDidUpdate = () => {
        this.props.getMessages(this.props.user1)
        const userMessages = this.props.chat.userMessages
        console.log(userMessages)
        this.state.msgList=[]
        userMessages.map((msg) => {
            const { position, type, text } = msg
            const date = new Date(msg.updatedAt)
            this.state.msgList.push({ position, type, text, date })
        })
        console.log(this.state.msgList)
        this.scrollRef.scrollIntoView({ behavior: 'smooth' })
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
        this.setState({msgList: [...this.state.msgList, this.state.msg]})
        this.setState({msg: ''})
        this.inputRef.clear()
        console.log(this.props.user1)
        this.props.addMessage(this.state.msg.text, this.state.position, this.props.user1)
    }

    inputRef = React.createRef();
    scrollRef = React.createRef();

    render() {
        return (
            // <div style={{overflow: 'hidden'}}>
            <div style={{height: 420, width: 450, overflow: 'scroll', backgroundColor: '#e5e4e2'}}/*style={{width: 420, height: 600, marginTop: -90, marginLeft: -50, marginRight: -100, backgroundColor:'white'}}*/>
            <div style={{height: 50, marginBottom: 10, backgroundColor: 'white'}}></div>
            <MessageList
                className='message-list'
                lockable={true}
                // downButtonBadge={10}
                toBottomHeight={'100%'}
                dataSource={this.state.msgList} />
                <div style={{marginTop: 340, position:'sticky'}} ref={el => (this.scrollRef = el)}>
                     <Input
        
                        placeholder="Write a message.."
                        value=""
                        ref='input'
                        multiline={true}
                        name='msg'
                        ref={el => (this.inputRef = el)}
                        onChange = {this.onChange}
                        // buttonsFloat='left'
                        rightButtons={
                            <Button
                                text='Send'
                                onClick={this.addMessage} />
                        } />
                
                </div>
            </div>
            // </div>
         )
    }
}

ChatPanel.propTypes = {
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    chat: state.chat,
})
export default connect(mapStateToProps, {addMessage, getMessages})(ChatPanel)