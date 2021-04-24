import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MessageList, Input, Button } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'

export class ChatPanel extends Component {
    
    render() {
        return (
            <div style={{height: 450, overflow: 'scroll', backgroundColor: '#e5e4e2'}}/*style={{width: 420, height: 600, marginTop: -90, marginLeft: -50, marginRight: -100, backgroundColor:'white'}}*/>
            <div style={{height: 50, marginBottom: 10, backgroundColor: 'white'}}></div>
            <MessageList
                className='message-list'
                // lockable={true}
                // downButtonBadge={10}
                // toBottomHeight={'50%'}
                dataSource={[
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
                    {
                        position: 'left',
                        type: 'text',
                        text: 'Lorem',
                        date: new Date(),
                    },
                    {
                        position: 'left',
                        type: 'text',
                        text: 'Lorem ips',
                        date: new Date(),
                    },
                    {
                        position: 'left',
                        type: 'text',
                        text: 'Lorem ips',
                        date: new Date(),
                    },
                    {
                        position: 'left',
                        type: 'text',
                        text: 'Lorem ips',
                        date: new Date(),
                    },
                    {
                        position: 'left',
                        type: 'text',
                        text: 'Lorem ipsum dolor sit amet',
                        date: new Date(),
                    },
                    {
                        position: 'left',
                        type: 'text',
                        text: 'Lorem ip',
                        date: new Date(),
                    },
                    {
                        position: 'left',
                        type: 'text',
                        text: 'Lorem',
                        date: new Date(),
                    }
            ]} />
            <Input
                        placeholder="Write a message.."
                        defaultValue=""
                        ref='input'
                        multiline={true}
                        // buttonsFloat='left'
                        rightButtons={
                            <Button
                                text='Send'
                                /*onClick={() => this.addMessage()}*/ />
                        } />
            </div>
         )
    }
}

export default connect()(ChatPanel)