import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container,
    Row,
    Col,
    Button,
    Jumbotron,
    Modal,
    ModalBody,
    ModalBodyProps,
    ModalHeader
} from 'reactstrap'
import profilepic from '../images/resources/friend-avatar10.jpg'
import doc from '../images/document.png'
import { SRLWrapper } from "simple-react-lightbox"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import axios from 'axios'
import AdoptPet from './Adopt'

const imageStyle = {
    width: 50,
    height: 50,
    objectFit: 'cover',
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
        time:'just now',
        likes:0,
        applicants:0,
        liked:false,
        applied:false,
        show:false,
        adoptForm:false,
        name:'',
        age:'',
        sex:'',
        marital_status:'',
        location:'',
        address:'',
        annualIncome:0,
        description:''
    }
    // this.showModal = this.showModal.bind(this);
    componentDidMount=()=>{
        this.showModal = this.showModal.bind(this);
        const nowTime= new Date(Date.now())
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

        this.state.user_type = window.localStorage.getItem('user_type')
        if (this.state.user_type == 'user') {
            axios.get(`../api/post/like/${JSON.parse(window.localStorage.getItem('user')).id}/${this.props.post._id}`, {
                headers: {
                    'x-auth-token': window.localStorage.getItem('token')
                }
            }).then((res) => this.setState({ liked: res.data.flag, likes: this.props.post.likes }))
        }

        else {
            axios.get(`../api/post/ngo/like/${JSON.parse(window.localStorage.getItem('user')).id}/${this.props.post._id}`, {
                headers: {
                    'x-auth-token': window.localStorage.getItem('token')
                }
            }).then((res) => this.setState({ liked: res.data.flag, likes: this.props.post.likes }))
        }
    }
    showModal = () => {
        this.setState({ show: true });
      };
      
    onTextChange = e => {
        this.setState({ [e.target.name]: e.target.value })
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

    onLike = () => {
        var l
        if (this.state.liked)
            l = this.state.likes - 1

        else l = this.state.likes + 1
        if (!this.state.liked) {

            if (window.localStorage.getItem('user_type') == 'user') {
                axios.post(`../api/post/like/${JSON.parse(window.localStorage.getItem('user')).id}/${this.props.post._id}`, {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('token')
                    }
                })
            }

            else {
                axios.post(`../api/post/ngo/like/${JSON.parse(window.localStorage.getItem('user')).id}/${this.props.post._id}`, {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('token')
                    }
                })
            }
        }

        else {
            if (window.localStorage.getItem('user_type') == 'user') {
                axios.post(`../api/post/dislike/${JSON.parse(window.localStorage.getItem('user')).id}/${this.props.post._id}`, {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('token')
                    }
                })
            }

            else {
                axios.post(`../api/post/ngo/dislike/${JSON.parse(window.localStorage.getItem('user')).id}/${this.props.post._id}`, {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('token')
                    }
                })
            }
        }

        this.setState({ likes: l, liked: !this.state.liked })
    }

    delete=()=>{
        axios.delete(`../api/post/${this.props.post._id}`)
            .then(window.location.reload())
    }
    onApply=()=>
    {
       this.setState({ adoptForm: !this.state.adoptForm })
       console.log('HELLO') 

    }

    onSubmit = (e) => {
        e.preventDefault()
        var l
        if (!this.state.applied)
            l = this.state.applicants + 1

    
        console.log(this.state)
        const formData = new FormData();
        console.log(this.state.name)
        formData.name = this.state.name;
        formData.age = this.state.age;
        formData.marital_status = this.state.marital_status;
        formData.sex = this.state.sex;
        formData.annualIncome = this.state.annualIncome;
        formData.address = this.state.address;

        console.log(formData)
       
        axios.post(`/api/post/apply/${JSON.parse(window.localStorage.getItem('user')).id}/${this.props.post._id}/`, {formData}
        );
        this.onApply()
       
    }


    render() {

        return (
            // Hiiiii
            
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
                            <div style={{ display: 'flex', float: 'right' }}>
                                {this.props.viewer == 'me' ? <Button onClick={this.delete}className='deleteBtn'>Delete</Button>
                                    : null}
                            </div>
                            <div style={{ display: 'flex' }}>
                                {/* <img src={profilepic} style={imageStyle}></img> */}
                                {this.props.post.user_type == 'user' ? <a href={'http://localhost:5000/api/users/image/' + this.props.post.user_id}>
                                    <img src={'../api/users/image/' + this.props.post.user_id} style={imageStyle}></img>
                                </a> : <a href={'http://localhost:5000/api/users/image/ngo/' + this.props.post.user_id}>
                                    <img src={'../api/users/image/ngo/' + this.props.post.user_id} style={imageStyle}></img>
                                </a>}

                                <div style={{ marginLeft: '10px' }}>
                                    <a className='linkhover' href={`/profile/${this.props.post.user_type}/${this.props.post.user_id}`}>{this.props.post.user_name}</a>
                                    <br></br>
                                    <span style={{ fontSize: '12px' }}>Published: {this.state.time}</span>
                                </div>
                                
                               
                            </div>
                            
                            <br></br>
                            { this.props.files.length>0 ?
                            <AliceCarousel disableButtonsControls={true} mouseTracking={true} controlsStrategy='responsive' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {this.props.files.map((f, i) => {
                                    return (
                                        <div>
                                            {f.contentType == 'image/png' || f.contentType == 'image/jpeg' || f.contentType == 'image/jpg' ?
                                                <a href={'http://localhost:5000/api/post/image/' + f.filename}>
                                                    <img style={{ width: '700px', height: '400px',objectFit:'cover'}} src={'../api/post/image/' + f.filename}></img>
                                                </a> :
                                                f.contentType == 'video/mp4' || f.contentType == 'video/ogg' || f.contentType == 'video/webm' ?
                                                    <video width="700px" controls><source src={'api/post/video/' + f.filename} /></video> :
                                                    f.contentType === 'application/pdf' || f.contentType === 'application/octet-stream'
                                                        || f.contentType === 'text/plain' || f.contentType === 'application/x-zip-compressed' ?
                                                        <a href={'http://localhost:5000/api/post/document/' + f.filename}>
                                                            <img src={doc} width='30px'></img>&nbsp;&nbsp;
                                        {f.metadata}</a> :
                                                        f.metadata}
                                        </div>
                                    )
                                })}
                            </AliceCarousel>
                            : null }
                            <div style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '15px' }}>
                                <p>
                                    {this.props.post.caption}
                                </p>
                                <div>
                                    <ul>
                                        <li style={{
                                            float: 'left',
                                            display: 'inline',
                                            marginRight: '20px',
                                            marginLeft: '-40px'
                                        }}>
                                            {
                                                this.state.liked ? <div><button onClick={this.onLike} title="Applications" class='hover active' style={{ fontSize: '20px', width: '40px', height: '40px', borderRadius: '20px', border: '0px solid white', backgroundColor: '#E74C3C', color: 'white' }}>
                                                    <i class="fa fa-heart"></i>
                                                </button><span> {this.state.likes}</span></div> : <div><button onClick={this.onLike} title="Applications" class='hover active' style={{ fontSize: '20px', width: '40px', height: '40px', borderRadius: '20px', border: '0px solid white', backgroundColor: '#E74C3C', color: 'white' }}>
                                                    <i class="fa fa-heart-o"></i>
                                                </button><span> {this.state.likes}</span></div>
                                            }
                                        </li>
                                        <li style={{
                                            display: 'inline',
                                            marginRight: '20px'
                                        }}>
                                            <button onClick={this.onApply} title="Applications" class='hover active' style={{ fontSize: '20px', width: '40px', height: '40px', borderRadius: '20px', border: '0px solid white', backgroundColor: '#77c3e7', color: 'white' }}>
                                                <i class="fa fa-user"></i>
                                            </button><span>{this.state.applicants}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
                <Modal
                    style={{}}
                    isOpen={this.state.adoptForm}
                    toggle={this.toggle}>
                         <ModalHeader toggle={this.onApply}>Start a Donation Drive</ModalHeader>
                    <ModalBody style={{
                        paddingTop: '20px',
                        paddingBottom: '0px',
                        display: "flex",
                        backgroundColor: 'white'}}>
                        <img src={profilepic} style={imageStyle}></img>
                        <form>
                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Name of the Applicant</label>
                            <br></br>
                            <input type='string' name='name' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='Name of the Applicant' onChange={this.onTextChange}></input>

                            <br></br><br></br>
                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Age</label>
                            <br></br>
                            <input type='string' name='age' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='Age' onChange={this.onTextChange}></input>

                             <br></br><br></br>

                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Sex</label>
                            <br></br>
                            <input type='string' name='sex' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='Male/Female/Other' onChange={this.onTextChange}></input>
                            
                            <br></br><br></br>
                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Marital Status</label>
                            <br></br>
                            <input type='string' name='marital_status' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='Married/Unmarried' onChange={this.onTextChange}></input>
                            <br></br><br></br>
                     
                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Annual Income</label>
                            <br></br>
                            <input type='number' name='annualIncome' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='In INR' onChange={this.onTextChange}></input>
                            <br></br><br></br>
                            
                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Permanent Address</label>
                            <br></br>
                            <input type='string' name='Address' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='Place of Residence' onChange={this.onTextChange}></input>
                            <br></br><br></br>
                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Reason for Adoption</label>
                            <br></br>
                            <textarea style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}
                                placeholder='Tell us why you want to go ahead with this adoption...'
                                rows="3" cols="20"
                                name='description'
                                onChange={this.onTextChange} />
                            
                            <div style={{ float: 'right', position: 'relative', marginTop: '-40px', marginRight: '20px', zIndex: '2' }} >
                                
            
                                <br></br>
                                    <button style={{ marginLeft: '10px' }} type="submit" onClick={this.onSubmit}>Submit Application</button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </Container>

            
            
        )
        
    }
    
}

export default connect()(FeedPost)