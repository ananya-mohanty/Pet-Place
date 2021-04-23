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
import { Link } from 'react-router-dom';
import white from '../images/white.png'
// import WishModal from '../components/WishModal';
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
                    <CardTitle tag="h5">{this.props.donation.name} <i class="fa fa-map-marker" title={`${this.props.donation.location.city}, ${this.props.donation.location.region}, ${this.props.donation.location.country_name}`}></i></CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h5">
                        {this.props.donation.targetAmount}</CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted">
                        Starts On: {this.props.donation.startDate}</CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted">
                        Ends On: {this.props.donation.endDate}</CardSubtitle>
                    <CardText>{this.props.donation.description}</CardText>
                    <Button>Donate</Button>
                    </CardBody>
                </div>
            // </div>
        )
    }
}


export class DonationsPage extends Component {

    state = {
        Donations: [],
        files:[],
    }

    componentDidMount() {
        axios.get('api/donations/')
            .then((res) => {
                // console.log(res.data)
                // console.log("heloo")
                // console.log(this.state.Donations)
                this.setState({Donations: res.data.items, files:res.data.files})
                // console.log(this.state.Donations)
                // this.helper(res.data)
            });
        
    }

    render() {

        return (
            <div className='container' style={mainStyle}>
                <div style={containerStyle}>
                <i class="fa fa-file-text-o fa-lg" aria-hidden="true" style={{float: "left", marginTop: 4}}></i><h5 style={{fontFamily:"muli"}}> &nbsp; &nbsp;Active Donation Drives</h5>
                <span style={spanStyle}>
                    {/* <Link to="/allitems" className='link'>All Toys </Link>| 
                    <Link to="/stuffedanimals" className='link'> Stuffed Animals </Link>| 
                    <Link to="/woodentoys" className='link'> Wooden Toys </Link> */}
                    </span><hr />
                    
                <Row>
                {
                    this.state.Donations.map((donation, i) => {
                        var files = this.state.files.filter((f) => donation.files.includes(f._id))
                         return (<div>
                            {
                                <DisplayDonation donation={donation} files={files} key={i} />
                            }
                        </div>)
                    })
                }</Row></div>
            </div>
        )
    }
}

export default connect()(DonationsPage)