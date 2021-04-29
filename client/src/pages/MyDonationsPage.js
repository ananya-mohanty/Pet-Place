import axios from 'axios';
import React, { Component } from 'react'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, ListGroup, ListGroupItem, CardHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import white from '../images/white.png'
// import WishModal from '../components/WishModal';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import NewDrive from '../components/NewDrive';

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
    marginTop: "30px",
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

const dpStyle = {
    width: 50,
    height: 50,

    borderRadius: 25,
    overflow: "hidden",
    alignSelf: 'flex-start',
}

class DisplayDonation extends Component {
    onClick = (e) => {
        // console.log(this.props.lostpet._id)
        axios.delete(`../api/donations/${this.props.donation._id}`)
            .then(window.location.reload())
    }
    render() {

        return (
            <div style={divStyle}>
                <div style={{ display: 'flex' }}>
                    <a href={'http://localhost:5000/api/users/image/ngo/' + this.props.donation.user_id}>
                        <img src={'../api/users/image/ngo/' + this.props.donation.user_id} style={dpStyle}></img>
                    </a>
                    <div style={{ marginLeft: '5px', marginTop: '15px' }}>
                        <a style={{}} href=""><h6>{this.props.donation.user_name}</h6></a>
                    </div>
                </div>

                <div style={{ marginTop: '5px', marginBottom: '5px' }}>

                    <a href={'http://localhost:5000/api/post/image/' + this.props.files[0].filename}>
                        <CardImg top style={{ height: "200px", width: '200px', objectFit: 'cover' }} src={'../api/post/image/' + this.props.files[0].filename} />
                    </a>
                </div>
                <CardTitle tag="h5">{this.props.donation.name}</CardTitle>
                <CardSubtitle >
                    Target Amount: {this.props.donation.targetAmount}<br></br>
                    Starts On: {this.props.donation.startDate}<br></br>
                    Ends On: {this.props.donation.endDate}</CardSubtitle>

                <CardText className="myColumn1" style={{ color: '#f4ca31f7', height: '100px', overflowY: 'auto', overflowX: 'hidden' }}>{this.props.donation.description}</CardText>
                    <Button onClick={this.onClick} className="deleteBtn">Delete</Button>
            </div>
            // </div>
        )

    }

}


export class MyDonationsPage extends Component {

    state = {
        Donations: [],
        files: [],
    }

    componentDidMount() {
        axios.get(`../api/donations/my/${this.props.user_id}`)
            .then((res) => {
                // console.log(res.data)
                // console.log("heloo")
                // console.log(this.state.Donations)
                console.log(res.data.items)
                this.setState({ Donations: res.data.items, files: res.data.files })
                // console.log(this.state.Donations)
                // this.helper(res.data)
            });

    }

    render() {

        return (
            <div className='container' style={mainStyle}>
                <div style={containerStyle}>
                    <div >
                        <i class="fa fa-file-text-o fa-lg" aria-hidden="true" style={{ float: "left", marginTop: 4 }}></i><h5 style={{ fontFamily: "muli" }}> &nbsp; &nbsp;Your Donation Drives</h5>
                        
                    </div>


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

export default connect()(MyDonationsPage)