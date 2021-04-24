import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MessageList, Input, Button } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'

export class ChatPanel extends Component {

    state= {
        msg: {},
        msgList: [
            {
                position: 'right',
                type: 'text',
                text: 'Lorem',
                date: new Date(),
            },
            {
                position: 'right',
                type: 'text',
                text: 'Lorem ipsum',
                date: new Date(),
            },
           ]
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
    }

    inputRef = React.createRef();

    render() {

        return (
            <div style={{height: 450, width: 450, overflow: 'scroll', backgroundColor: '#e5e4e2'}}/*style={{width: 420, height: 600, marginTop: -90, marginLeft: -50, marginRight: -100, backgroundColor:'white'}}*/>
            <div style={{height: 50, marginBottom: 10, backgroundColor: 'white'}}></div>
            <MessageList
                className='message-list'
                // lockable={true}
                // downButtonBadge={10}
                // toBottomHeight={'50%'}
                dataSource={this.state.msgList} />
                <div style={{marginTop: 340}}>
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
         )
    }
}

export default connect()(ChatPanel)