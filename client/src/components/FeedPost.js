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

    state={
        img:null
    }
    componentDidMount(){
            var base64Flag = `data:image/${this.props.post.filetype};base64,`;
            var imageStr = this.arrayBufferToBase64(this.props.post.file.data.data);
            this.setState({img: base64Flag + imageStr})
            console.log(this.state.img)
    }
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
                            backgroundColor: 'white'
                        }}>
                            <div style={{display:'flex'}}>
                                <img src={profilepic} style={imageStyle}></img>
                                <div style={{ marginLeft: '10px' }}>
                                    <a href="">Janice Griffith</a>
                                    <br></br>
                                    <span style={{ fontSize: '12px' }}>Published: {this.props.post.time}</span>
                                </div>
                            </div>
                            <div style={{ padding: '10px', width: '700px' }}>
                                {this.props.post.filetype=='mp4'?
                                    <video width="700px" controls>
                                        <source src={this.state.img} type="video/mp4" />
                                    </video>:
                                    <img src={this.state.img} style={{ width: '700px' }} ></img>}
                                <br></br>
                                <br></br>
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