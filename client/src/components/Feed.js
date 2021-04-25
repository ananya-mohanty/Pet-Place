import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import FeedPost from '../components/FeedPost'
import NewPost from '../components/NewPost'
import {Container, Row, Col, Jumbotron,
    Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";


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
    width: 250, 
    borderStyle:"solid", 
    borderWidth: 1, 
    borderColor: "rgba(0,0,0,0.1)",
    marginTop: "3.5rem",
    marginLeft: "3.5rem",
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
                    <CardTitle tag="h6">{this.props.donation.name} <i class="fa fa-map-marker" title={`${this.props.donation.location.city}, ${this.props.donation.location.region}, ${this.props.donation.location.country_name}`}></i></CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Target Amount: {this.props.donation.targetAmount}</CardSubtitle>
                    {/* <CardSubtitle className="mb-2 text-muted" tag="h6"> */}
                        <CardText>Starts On: {this.props.donation.startDate}
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
        filesDonations: []
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
    }
    render() {
        return (
            <Container style={{marginLeft: 130}}><Row>
                <Col>
                
                </Col>
                <Col><div style={{marginLeft: -90}}>
            <NewPost />
            {this.state.posts.map((post, i) => {
                var files = this.state.files.filter((f) => post.files.includes(f._id))
                // console.log(files)
                return (<div>
                    { 
                        <FeedPost post={post} files={files} key={i} />
                    }
                </div>)
            })}</div></Col><Col><div style={{marginTop: 35}}>
                {
                    this.state.Donations.map((donation, i) => {
                        var files = this.state.files.filter((f) => donation.files.includes(f._id))
                         return (<div><Row>
                            {
                                <DisplayDonation donation={donation} files={files} key={i} />
                            }
                        </Row></div>)
                    })
                }</div>
            </Col>
            </Row></Container>
         
        )
    }
}
export default connect()(Feed)