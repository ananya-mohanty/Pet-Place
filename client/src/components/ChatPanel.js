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
        msgList: [],
        flag: false
    }

    prevuser = null
    // msgList = []

    componentDidMount=()=>{
        this.props.getMessages(this.props.user1)
        const userMessages = this.props.chat.userMessages
        userMessages.map((msg)=>{
            const{position, type, text}=msg
            const date=new Date(msg.updatedAt)
            this.state.msgList.push({position, type, text, date})
            // this.msgList.push({position, type, text, date})
        })
        // console.log("called")
        // this.scrollRef.scrollIntoView({ behavior: 'smooth' })
        // setTimeout(() => {
        //     this.state.flag = true
        //   }, 10000);
        // this.interval = setInterval(() => this.setState({flag: true}), 12000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }    
    
    componentDidUpdate = () => {
        this.interval = null
        console.log(this.props.user1)
        this.props.getMessages(this.props.user1)
        const userMessages = this.props.chat.userMessages
        this.state.msgList=[]
        // this.msgList = []
        userMessages.map((msg) => {
            const { position, type, text } = msg
            const date = new Date(msg.updatedAt)
            this.state.msgList.push({ position, type, text, date })
            // this.msgList.push({position, type, text, date})
        })
        console.log("called")
        // this.scrollRef.scrollIntoView({ behavior: 'smooth' })
        if(this.prevuser != this.props.user1) {
            this.setState({flag: false})
            this.interval = setInterval(() => this.setState({flag: true}), 25000);
        }
        this.prevuser = this.props.user1
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
        // this.msgList.push(this.state.msg)
        this.setState({msg: ''})
        this.inputRef.clear()
        this.props.addMessage(this.state.msg.text, this.state.position, this.props.user1)
    }

    inputRef = React.createRef();
    scrollRef = React.createRef();

    render() {
        return (
            // <div style={{overflow: 'hidden'}}>
            <div style={{ backgroundColor: '#e5e4e2',}} overflow='hidden' /*style={{width: 420, height: 600, marginTop: -90, marginLeft: -50, marginRight: -100, backgroundColor:'white'}}*/>
            {this.props.user1!=null ? <div>
            {this.state.flag ? (<div>
            <div style={{height: 45, marginBottom: 10, backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 10}}></div>
            <MessageList
                className='message-list'
                // downButtonBadge={10}
                toBottomHeight={'100%'}
                dataSource={this.state.msgList} />
                <div style={{marginTop: 350, position:'sticky'}} ref={el => (this.scrollRef = el)}>
                     <Input
                        placeholder="Write a message.."
                        value=""
                        // ref='input'
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
                ) : <div>Please wait while we load your messages</div>}
                </div> : null}
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