import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import FeedPost from '../components/FeedPost'
import NewPost from '../components/NewPost'
import {
    Container, Row, Col, Jumbotron,
    Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Modal, ModalBody,
    ModalBodyProps,
    ModalHeader,
} from 'reactstrap'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import ChatPanel from '../components/ChatPanel';
import {Link} from 'react-router-dom'


const mainStyle = {
    position: "relative",
    padding: "3rem"
}

const JumbotronStyle = {
    background: "F5F5F5",
    marginTop: "3.5rem",
    marginLeft: "5rem",
    width: "12rem",
    borderRadius: "20px",
    padding: "10px",
    textAlign: "center"
};

const divStyle = {
    width: 230,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    // marginTop: "2rem",
    // marginLeft: "3.5rem",
    padding: "10px",
    textAlign: "center",
    backgroundColor: 'white'
}

const containerStyle = {
    width: 1050, /* Can be in percentage also. */
    height: "auto",
    margin: "0 auto",
    padding: 50,
    position: "relative",
    background: "white"
}

const imageStyle = {
    height: "8rem",
    width: "8rem"
}
const dpStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: 'flex-start',
}
const buttonStyle = {
    border: "None",
    borderRadius: "20px",
    background: "white",
    color: "black",
    float: 'right'
}


const spanStyle = {
    float: "right",
    marginTop: "-1.5rem"
}

class LostPet extends Component {
    state = {
        chatPanel: false,
        makeDonation:false
    }
    toggle = () => {
        this.setState({ chatPanel: !this.state.chatPanel });
    }
    onClick = (e) => {
        this.setState({ chatPanel: !this.state.chatPanel })
    }
   
    render() {
        return (
            <div style={divStyle}>
                <div style={{ display: 'flex' }}>
                    {this.props.lostpet.user_type == 'ngo' ? <a href={'http://localhost:5000/api/users/image/ngo/' + this.props.lostpet.user_id}>
                        <img src={'api/users/image/ngo/' + this.props.lostpet.user_id} style={dpStyle}></img>
                    </a> : <a href={'http://localhost:5000/api/users/image/' + this.props.lostpet.user_id}>
                        <img src={'api/users/image/' + this.props.lostpet.user_id} style={dpStyle}></img>
                    </a>}
                    <div style={{ marginLeft: '5px', marginTop: '5px' }}>
                        <a className='linkhover' href={`/profile/${this.props.lostpet.user_type}/${this.props.lostpet.user_id}`}><h6>{this.props.lostpet.user_name}</h6></a>
                    </div>
                </div>
                <div style={{ marginTop: '5px' }} >
                    <a href={'http://localhost:5000/api/post/image/' + this.props.files[0].filename}>
                        <CardImg top style={{height:"200px", width:'200px', objectFit:'cover'}} src={'api/post/image/' + this.props.files[0].filename} />
                    </a>
                </div>
                <CardBody>
                    <CardText>
                        <CardTitle tag="h6">{this.props.lostpet.breed} </CardTitle>
                        <CardSubtitle>Location: {this.props.lostpet.location.city}</CardSubtitle>
                        <CardSubtitle>Last Seen: {this.props.lostpet.lastseen}</CardSubtitle>
                    </CardText>
                    <Link to={`/chat/${this.props.lostpet.user_id}`}><Button className='foundBtn' onClick={this.onClick} size='sm'>Found</Button></Link>
                </CardBody>
                
            </div>
            // </div>
        )
    }
}


class DisplayDonation extends Component {
    state = {
      
        makeDonation:false
    }
    onDonate =(e) =>{
        this.setState({ makeDonation: !this.state.makeDonation })
        console.log('helllo')
    }
    onTextChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault()
        

    
        const formData = new FormData();
        console.log(this.state.name)
        formData.name = this.state.name;
        formData.contactNo = this.state.contactNo;
        formData.emailID = this.state.emailID;
        formData.amount = this.state.amount;
        formData.cause = this.props.donation.description;
        formData.donation = this.props.donation.name;
        formData.donationID = this.props.donation._id;
        formData.currentAmount = this.props.donation.currentAmount;
        // formData.annualIncome = this.state.annualIncome;
        // formData.address = this.state.address;
 
        console.log(formData)
        axios.post(`/api/contribute/${this.props.donation._id}`, {formData});
        window.location.href=`https://pages.razorpay.com/pl_H2rkPEYsi0hLnB/view?amount=` + this.state.amount+ `&name=` + this.state.name + `&donation_drive_name=` + this.props.donation.name  + `&phone=` + this.state.contactNo + `&email=` + this.state.emailID + `&cause=` + this.props.donation.description;
        // axios.post({`https://pages.razorpay.com/pl_H2rkPEYsi0hLnB/view?donation_drive_name=` + this.props.donation.name});
       
    }
    render() {
        return (
            <div style={divStyle}>
                <div style={{ display: 'flex' }}>
                    <a href={'http://localhost:5000/api/users/image/ngo/' + this.props.donation.user_id}>
                        <img src={'api/users/image/ngo/' + this.props.donation.user_id} style={dpStyle}></img>
                    </a>
                    <div style={{ marginLeft: '5px', marginTop: '5px' }}>
                        <a className='linkhover' href={`/profile/ngo/${this.props.donation.user_id}`}><h6>{this.props.donation.user_name}</h6></a>
                    </div>
                </div>

                <div style={{ marginTop: '5px' }}>
                    <a href={'http://localhost:5000/api/post/image/' + this.props.files[0].filename}>
                        <CardImg top style={{ height: "200px", width: '200px', objectFit: 'cover' }} src={'api/post/image/' + this.props.files[0].filename} />
                                        </a>
                                   
                </div>
                <CardBody>
                  
                    <CardText >
                        <CardTitle tag="h6">{this.props.donation.name}</CardTitle>
                        <CardSubtitle > Amount Raised: Rs. {this.props.donation.currentAmount} </CardSubtitle>
                        <CardSubtitle >Target Amount: Rs. {this.props.donation.targetAmount}</CardSubtitle>
                        {/* </CardSubtitle> */}
                        {/* <CardSubtitle className="mb-2 text-muted" tag="h6"> */}
                        <CardSubtitle >Ends On: {this.props.donation.endDate}</CardSubtitle>
                        {/* </CardSubtitle> */}
                        {/* <div style={{ fontSize: 13, lineHeight: 'normal', textAlign: 'left', marginLeft: 15, width: 165 }}>{this.props.donation.description}</div></CardText> */}
                    </CardText >
                    {/* <a href={"https://pages.razorpay.com/pl_H2rkPEYsi0hLnB/view?donation_drive_name=" + this.props.donation.name}> */}
                        <Button  className="donateBtn" size='sm' onClick={this.onDonate} >Donate</Button>
                    {/* </a> */}
                </CardBody>
                <Modal
                    style={{}}
                    isOpen={this.state.makeDonation}
                    toggle={this.toggle}>
                         <ModalHeader toggle={this.onDonate}>Make a Donation</ModalHeader>
                    <ModalBody style={{
                        paddingTop: '20px',
                        paddingBottom: '0px',
                        display: "flex",
                        backgroundColor: 'white'
                        }}>
                        {/* <img src={profilepic} style={imageStyle}></img> */}
                        <form>
                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Name of the Donor</label>
                            <br></br>
                            <input type='string' name='name' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='Name of the Donor' onChange={this.onTextChange}></input>

                            <br></br><br></br>
                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Amount</label>
                            <br></br>
                            <input type='number' name='amount' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='(in INR)' onChange={this.onTextChange}></input>

                             <br></br><br></br>

                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Email ID</label>
                            <br></br>
                            <input type='email' name='emailID' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='xyz@abc.com' onChange={this.onTextChange}></input>
                            
                            <br></br><br></br>
                            <label style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}>Contact Number</label>
                            <br></br>
                            <input type='number' name='contactNo' style={{
                                marginLeft: '15px', position: 'relative',
                                zIndex: '1', borderColor: '#eeeeee', borderRadius: '6px', borderWidth: '1px'
                            }} placeholder='10 digits' onChange={this.onTextChange}></input>
                            <br></br><br></br>
                     
                            
                            <div style={{ padding:'1rem',float: 'right', position: 'relative', marginTop: '-40px', marginLeft: '20px', zIndex: '2' }} > 
                                
            
                                <br></br>
                                    <button style={{ marginLeft: '100px', padding:'10px', backgroundColor:'#f4ca31f7' }} type="submit" onClick={this.onSubmit}>Donate</button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
            
            // </div>
        )
    }
}

export class Feed extends Component {
    state = {
        posts: [],
        files: [],
        Donations: [],
        filesDonations: [],
        LostPets: [],
        fileslostpets: []
    }

    componentDidMount = () => {
        axios.get('api/post')
            .then(res => {
                this.setState({ posts: res.data.items, files: res.data.files })
            }).catch(res => {
                window.location.href = '/login'
            }
            );

        axios.get('api/donations/')
            .then((res) => {
                // console.log(res.data)
                // console.log("heloo")
                // console.log(this.state.Donations)
                this.setState({ Donations: res.data.items, filesDonations: res.data.files })
                // console.log(this.state.Donations)
                // this.helper(res.data)
            });

        axios.get('api/lostpet/')
            .then((res) => {

                this.setState({ LostPets: res.data.items, fileslostpets: res.data.files })

            });

    }
    render() {
        return (
            <Container style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '90px',  }}><Row>
                <Col className="myColumn1" style={{ marginBottom: 90, marginRight: -20, marginTop: 90, height: '1300px', overflowY: 'scroll', overflowX: 'auto',  }}xs={'auto'}/*style={{width: 30}}*/>
                    <div style={{/*marginLeft: -135, *//* marginLeft: -80*/ }}>
                        {/* <div style={{marginLeft: 130, marginBottom: -20}}>Lost Pets</div> */}
                        {
                            this.state.LostPets.map((lostpet, i) => {
                                var files = this.state.fileslostpets.filter((f) => lostpet.files.includes(f._id))
                                return (<div>
                                    {
                                        <LostPet lostpet={lostpet} files={files} key={i} onClick={this.onClick} />

                                    }
                                    <br></br>
                                </div>)
                            })
                        }
                    </div></Col>
                <Col xs={'auto'} className="myColumn1" style={{marginBottom: 90, marginTop: 90, height: '1300px', overflowY: 'scroll', overflowX:'auto', position:''}}><div /*style={{marginLeft: -90}}*/>
                    <NewPost />
                    {this.state.posts.map((post, i) => {
                        var files = this.state.files.filter((f) => post.files.includes(f._id))
                        // console.log(files)
                        return (<div>
                            {
                                <FeedPost post={post} files={files} key={i} />
                            }
                        </div>)
                    })}
                </div>
                </Col>
                <Col className="myColumn1" style={{ marginBottom: 90, marginTop: 90, height: '1300px', overflowY: 'scroll', overflowX:'auto', position:''}}xs={'auto'}>
                    <div style={{  }}>
                        {/* <div style={{marginTop: 90, marginLeft: 90, marginBottom: -15}}>Donation Drives</div> */}
                        {
                            this.state.Donations.map((donation, i) => {
                                var files = this.state.filesDonations.filter((f) => donation.files.includes(f._id))
                                return (<div><Row>
                                    {
                                        <DisplayDonation donation={donation} files={files} key={i} />
                                    }
                                </Row>
                                    <br></br></div>)
                            })
                        }
                    </div>
                </Col>
            </Row></Container>

        )
    }
}
export default connect()(Feed)