import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import FeedPost from '../components/FeedPost'
import NewPost from '../components/NewPost'
import {Container, Row, Col, Jumbotron,
    Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Modal, ModalBody} from 'reactstrap'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import ChatPanel from '../components/ChatPanel';


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
    borderStyle:"solid", 
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
    height: "8rem"
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
        chatPanel: false
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
                {this.props.files.length == 1 ? <a href={'http://localhost:5000/api/post/image/' + this.props.files[0].filename}>
                    <CardImg top width="50" src={'api/post/image/' + this.props.files[0].filename} />
                </a> :
                    <AliceCarousel>
                        {this.props.files.map((f, i) => {
                            return (
                                <div>
                                    {
                                        <a href={'http://localhost:5000/api/post/image/' + f.filename}>
                                            <CardImg top width="50" src={'api/post/image/' + f.filename} />
                                        </a>
                                    }
                                </div>
                            )
                        })
                        }
                    </AliceCarousel>}
                <CardBody>
                    <CardText>Lost Animal: {`${this.props.lostpet.location.city}, ${this.props.lostpet.location.region}`}
                    <div>
                        Last Seen: {this.props.lostpet.lastseen}</div></CardText>
                    <CardText>
                    <div style={{fontSize: 13, lineHeight: 'normal', textAlign: 'left', /*marginLeft: 15,*/ width: 165}}>
                        {this.props.lostpet.description}
                    </div>
                    </CardText>
                    
                    <Button onClick={this.onClick} color='info' size='sm'>Found?</Button>
                </CardBody>
                <Modal
                    style={{ float: 'right' }}
                    isOpen={this.state.chatPanel}
                    toggle={this.toggle}>
                    <ModalBody>
                        <ChatPanel user1={this.props.lostpet.user_id} />
                    </ModalBody>
                </Modal>
            </div>
            // </div>
        )
    }
}


class DisplayDonation extends Component {
    render() {
        return (
            <div style={divStyle}>
                {this.props.files.length == 1 ? <a href={'http://localhost:5000/api/post/image/' + this.props.files[0].filename}>
                    <CardImg top width="50" src={'api/post/image/' + this.props.files[0].filename} />
                </a>:
                <AliceCarousel>
                {this.props.files.map((f, i) => {
                    return (
                        <div>
                            {
                                <a href={'http://localhost:5000/api/post/image/' + f.filename}>
                                    <CardImg top width="50"  src={'api/post/image/' + f.filename} />
                                </a>
                            }
                        </div>
                        )})
                    }
                    </AliceCarousel>}
                    <CardBody>
                    {/* <CardTitle tag="h6">{this.props.donation.name} <i class="fa fa-map-marker" title={`${this.props.donation.location.city}, ${this.props.donation.location.region}, ${this.props.donation.location.country_name}`}></i></CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Target Amount: {this.props.donation.targetAmount}</CardSubtitle> */}
                    {/* <CardSubtitle className="mb-2 text-muted" tag="h6"> */}
                        <CardText>
                            <div>{this.props.donation.name} <i class="fa fa-map-marker" title={`${this.props.donation.location.city}, ${this.props.donation.location.region}, ${this.props.donation.location.country_name}`}></i></div>
                            <div>Target Amount: {this.props.donation.targetAmount}</div>
                            Starts On: {this.props.donation.startDate}
                    {/* </CardSubtitle> */}
                    {/* <CardSubtitle className="mb-2 text-muted" tag="h6"> */}
                    <div>Ends On: {this.props.donation.endDate}</div>
                    {/* </CardSubtitle> */}
                    <div style={{fontSize: 13, lineHeight: 'normal', textAlign: 'left', marginLeft: 15, width: 165}}>{this.props.donation.description}</div></CardText>
                    <Button color='success' size="sm">Donate</Button>
                    <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_H2oWQW41mxnLsz" async> </script> </form>
                    </CardBody>
                </div>
            // </div>
        )
    }
}

export class Feed extends Component {
    state={
        posts:[],
        files:[],
        Donations: [],
        filesDonations: [],
        LostPets: [],
        fileslostpets: []
    }
     
    componentDidMount = ()=> {
        axios.get('api/post',{headers:{
            'x-auth-token':window.localStorage.getItem('token')
        }})
            .then(res => {
                this.setState({ posts: res.data.items, files: res.data.files })
            }).catch(res=>
                {
                    window.location.href='/login'
                }
            );

            axios.get('api/donations/')
            .then((res) => {
                // console.log(res.data)
                // console.log("heloo")
                // console.log(this.state.Donations)
                this.setState({Donations: res.data.items, filesDonations:res.data.files})
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
            <Container style={{marginLeft: 50}}><Row>
                <Col xs={'auto'}/*style={{width: 30}}*/>
                    <div style={{/*marginLeft: -135, */marginTop: 90,/* marginLeft: -80*/ marginRight: -20}}>
                        {/* <div style={{marginLeft: 130, marginBottom: -20}}>Lost Pets</div> */}
                {
                                this.state.LostPets.map((lostpet, i) => {
                                    var files = this.state.fileslostpets.filter((f) => lostpet.files.includes(f._id))
                                    return (<div>
                                        {
                                            <LostPet lostpet={lostpet} files={files} key={i} onClick={this.onClick} />
                                        }
                                    </div>)
                                })
                            }
                </div></Col>
                <Col xs={'auto'}><div /*style={{marginLeft: -90}}*/>
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
            <Col xs={'auto'}><div style={{marginTop: 90}}>
                {/* <div style={{marginTop: 90, marginLeft: 90, marginBottom: -15}}>Donation Drives</div> */}
                {
                    this.state.Donations.map((donation, i) => {
                        var files = this.state.filesDonations.filter((f) => donation.files.includes(f._id))
                         return (<div><Row>
                            {
                                <DisplayDonation donation={donation} files={files} key={i} />
                            }
                        </Row></div>)
                    })
                }
                </div>
            </Col>
            </Row></Container>
         
        )
    }
}
export default connect()(Feed)