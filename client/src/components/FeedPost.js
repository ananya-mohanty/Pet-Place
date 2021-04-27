import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap'
import profilepic from '../images/resources/friend-avatar10.jpg'
import doc from '../images/document.png'
import { SRLWrapper } from "simple-react-lightbox"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import axios from 'axios'


const imageStyle = {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: 'flex-start',
}

function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

function getDifferenceInHours(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60));
}

function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60));
}


export class FeedPost extends Component {
    state={
        data:[],
        time:'just now'
    }

    componentDidMount=()=>{
        const nowTime= new Date(Date.now())
        const postTime = new Date(this.props.post.time)
        const minutes = getDifferenceInMinutes(postTime, nowTime)
        const hours = getDifferenceInHours(postTime, nowTime)
        const days = getDifferenceInDays(postTime, nowTime)
        console.log(minutes, hours, days)
        if (minutes<60&&minutes>1)
            this.state.time = `${minutes} minutes ago`

        else if(hours==1)
            this.state.time = `${hours} hour ago`

        else if(hours>1&&hours<24)
        this.state.time = `${hours} hours ago`

        else if(days==1)
        this.state.time= `${days} day ago`

        else if (days > 1)
            this.state.time = `${days} days ago`

        this.setState({})

    }

    componentDidUpdate = () => {
        const nowTime = new Date(Date.now())
        const postTime = new Date(this.props.post.time)
        const minutes = getDifferenceInMinutes(postTime, nowTime)
        const hours = getDifferenceInHours(postTime, nowTime)
        const days = getDifferenceInDays(postTime, nowTime)
        console.log(minutes, hours, days)
        if (minutes < 60 && minutes > 1)
            this.state.time = `${minutes} minutes ago`

        else if (hours == 1)
            this.state.time = `${hours} hour ago`

        else if (hours > 1 && hours < 24)
            this.state.time = `${hours} hours ago`

        else if (days == 1)
            this.state.time = `${days} day ago`

        else if (days > 1)
            this.state.time = `${days} days ago`
    }

    Like=()=>
    {
        axios.post(`api/post/like/${this.props.post.id}`, {
            headers: {
                'x-auth-token': window.localStorage.getItem('token')
            }
        })
    }

    render() {

        return (
            <Container style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // marginRight: -35
                }}>
                <Row>
                    <Col>
                        <Jumbotron style={{
                            padding: '20px',
                            backgroundColor: 'white',
                            width: '550px'
                        }}>
                            <div style={{display:'flex'}}>
                                <img src={profilepic} style={imageStyle}></img>
                                <div style={{ marginLeft: '10px' }}>
                                    <a href="">{this.props.post.user_name}</a>
                                    <br></br>
                                    <span style={{ fontSize: '12px' }}>Published: {this.state.time}</span>
                                </div>
                            </div>
                            <br></br>
                            <AliceCarousel style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                {this.props.files.map((f, i) => {
                                        return(
                                            <div>
                                        {f.contentType == 'image/png' || f.contentType == 'image/jpeg' || f.contentType == 'image/jpg'?
                                        <a href={'http://localhost:5000/api/post/image/' + f.filename}>
                                            <img  src={'api/post/image/' + f.filename}></img>
                                        </a>:
                                        f.contentType == 'video/mp4' || f.contentType == 'video/ogg' || f.contentType == 'video/webm'?
                                        <video width="700px" controls><source src={'api/post/video/' + f.filename}/></video>:
                                        f.contentType === 'application/pdf' || f.contentType === 'application/octet-stream' 
                                        || f.contentType === 'text/plain' || f.contentType === 'application/x-zip-compressed'?
                                        <a href={'http://localhost:5000/api/post/document/' + f.filename}>
                                                                <img src={doc} width='30px'></img>&nbsp;&nbsp;
                                        {f.metadata}</a>:
                                        f.metadata}
                                        </div>
                                    )})}
                                 </AliceCarousel>
                            <div style={{ paddingLeft: '10px', paddingRight: '10px', marginTop:'-15px'}}>
                                <p>
                                    {this.props.post.caption}
                                </p>
                                <div>
                                    <ul>
                                        <li style={{
                                            float:'left',
                                            display: 'inline',
                                            marginRight: '20px',
                                            marginLeft:'-40px'
                                        }}>
                                            <button title="Applications" class='hover active' style={{ fontSize: '20px', width: '40px', height: '40px', borderRadius: '20px', border: '0px solid white', backgroundColor:'#E74C3C', color:'white' }}>
                                                <i class="fa fa-heart"></i>
                                            </button><span> {this.props.post.likes}</span>
                                        </li>
                                        <li style={{
                                            display: 'inline',
                                            marginRight: '20px'
                                        }}>
                                            <button onClick={this.Like}title="Applications" class='hover active' style={{ fontSize: '20px', width: '40px', height: '40px', borderRadius: '20px', border: '0px solid white', backgroundColor: '#77c3e7', color: 'white' }}>
                                                <i class="fa fa-user"></i>
                                            </button><span>{this.props.post.likes}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect()(FeedPost)