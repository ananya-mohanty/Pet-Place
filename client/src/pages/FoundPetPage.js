import axios from 'axios';
import React, { Component } from 'react'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

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

class FoundPet extends Component {
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
                    <CardTitle tag="h6">Found Animal: {`${this.props.lostpet.location.city}, ${this.props.lostpet.location.region}`}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted">
                        Found On: {this.props.lostpet.lastseen}</CardSubtitle>
                    <CardText>{this.props.lostpet.description}</CardText>
                    <Button>Your Pet?</Button>
                </CardBody>
            </div>
            // </div>
        )
    }
}


export class FoundPetPage extends Component {

    state = {
        LostPets: [],
        files: [],
    }

    componentDidMount() {
        axios.get('api/lostpet/found')
            .then((res) => {

                this.setState({ LostPets: res.data.items, files: res.data.files })

            });

    }

    render() {

        return (
            <div className='container' style={mainStyle}>
                <div style={containerStyle}>
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
                                        <FoundPet lostpet={lostpet} files={files} key={i} />
                                    }
                                </div>)
                            })
                        }</Row></div>
            </div>
        )
    }
}

export default connect()(FoundPetPage)