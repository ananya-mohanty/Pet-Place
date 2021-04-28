import axios from 'axios';
import React, { Component } from 'react'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import ChatPanel from '../components/ChatPanel';
import {Link} from 'react-router-dom'

const mainStyle = {
    position: "relative",
    padding: "3rem"
}

const divStyle = {
    width: 250,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    marginTop: "3.5rem",
    marginLeft: "3.5rem",
    padding: "10px",
    textAlign: "center"
}

const containerStyle = {
    // width: 1050, /* Can be in percentage also. */

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
                    </AliceCarousel>
                <CardBody>
                    <CardTitle tag="h6">Lost Animal: {`${this.props.lostpet.location.city}, ${this.props.lostpet.location.region}`}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted">
                        Last Seen: {this.props.lostpet.lastseen}</CardSubtitle>
                    <CardText>{this.props.lostpet.description}</CardText>
                    <Link to={`/chat/${this.props.lostpet.user_id}`}><Button onClick={this.onClick}>Found?</Button></Link>
                </CardBody>
                {/* <Modal
                    style={{}}
                    isOpen={this.state.chatPanel}
                    toggle={this.toggle}>
                    <ModalBody>
                        <ChatPanel user1={this.props.lostpet.user_id} />
                    </ModalBody>
                </Modal> */}
            </div>
            // </div>
        )
    }
}


export class LostPetPage extends Component {

    state = {
        LostPets: [],
        files: [],
    }



    componentDidMount() {
        axios.get('api/lostpet/')
            .then((res) => {

                this.setState({ LostPets: res.data.items, files: res.data.files })

            });

    }

    render() {

        return (
            <Container>
                <div className='container' style={mainStyle}>
                    <div style={{ height: "auto", margin: "0 auto", padding: 50, position: "relative", background: "white", width: 800 }}>
                        <i class="fa fa-file-text-o fa-lg" aria-hidden="true" style={{ float: "left", marginTop: 4 }}></i><h5 style={{ fontFamily: "muli" }}> &nbsp; &nbsp;Lost Pets Near Your Location</h5>
                        <span style={spanStyle}>
                            {/* <Link to="/allitems" className='link'>All Toys </Link>| 
                    <Link to="/stuffedanimals" className='link'> Stuffed Animals </Link>| 
                    <Link to="/woodentoys" className='link'> Wooden Toys </Link> */}
                        </span><hr />

                        <Row>
                            {
                                this.state.LostPets.map((lostpet, i) => {
                                    var files = this.state.files.filter((f) => lostpet.files.includes(f._id))
                                    return (<div>
                                        {
                                            <LostPet lostpet={lostpet} files={files} key={i} onClick={this.onClick} />
                                        }
                                    </div>)
                                })
                            }</Row></div>
                </div>
            </Container>
        )
    }
}

export default connect()(LostPetPage)