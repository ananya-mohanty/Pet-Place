import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap'
import profilepic from '../images/resources/friend-avatar10.jpg'

const imageStyle = {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: 'flex-start',
}


export class FeedPost extends Component {
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    render() {
        return (
            <Container style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}>
                <Row>
                    <Col>
                        <Jumbotron style={{
                            padding: '20px',
                            backgroundColor: 'white',
                            width: '750px'
                        }}>
                            <div style={{display:'flex'}}>
                                <img src={profilepic} style={imageStyle}></img>
                                <div style={{ marginLeft: '10px' }}>
                                    <a href="">Janice Griffith</a>
                                    <br></br>
                                    <span style={{ fontSize: '12px' }}>Published: {this.props.post.time}</span>
                                </div>
                            </div>
                            <br></br>
                            <div style={{ padding: '15px', align:'center'}}>
                                {/* {this.props.post.filetype=='mp4'?
                                    <video width="700px" controls>
                                        <source src={this.state.img} type="video/mp4" />
                                    </video>:
                                    <img src={this.state.img} style={{ width: '700px' }} ></img>} */}
                                    {this.props.files.map((f, i) => {
                                        return(
                                            <div>
                                        {f.contentType == 'image/png' || f.contentType == 'image/jpeg' || f.contentType == 'image/jpg'?
                                        <a href={'api/post/image/' + f.filename}>
                                            <img src={'api/post/image/' + f.filename} style={{ width: '700px' }} ></img>
                                        </a>:
                                        f.contentType == 'video/mp4' || f.contentType == 'video/ogg' || f.contentType == 'video/webm'?
                                        <video width="700px" controls><source src={'api/post/video/' + f.filename}/></video>:
                                        f.contentType === 'application/pdf' || f.contentType === 'application/octet-stream' 
                                        || f.contentType === 'text/plain' || f.contentType === 'application/x-zip-compressed'?
                                        <a href={'api/post/document/' + f.filename}>{f.metadata}</a>:
                                        f.metadata}
                                        <br></br>
                                        <br></br>
                                        </div>
                                    )})}
                                <div>
                                    <ul style={{marginLeft:'-40px'}}>
                                        <li style={{
                                            display: 'inline',
                                            marginRight: '20px'
                                        }}>
                                            <span title='Views'>
                                                <i class="fa fa-eye"></i>
                                                <ins style={{fontSize:'10px'}}>1.2k</ins>
                                            </span>
                                        </li>
                                        <li style={{
                                            display: 'inline',
                                            marginRight: '20px'
                                        }}>
                                            <span title="like">
                                                <i class="ti-heart"></i>
                                                <ins style={{ fontSize: '10px' }}>2.2k</ins>
                                            </span>
                                        </li>
                                        <li style={{
                                            display: 'inline',
                                            marginRight: '20px'
                                        }}>
                                            <span title="Applications">
                                                <i class="fa fa-user"></i>
                                                <ins style={{ fontSize: '10px' }}>52</ins>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <p>
                                    {this.props.post.caption}
								</p>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect()(FeedPost)