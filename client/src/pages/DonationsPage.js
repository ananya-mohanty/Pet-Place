import axios from 'axios';
import React, { Component } from 'react'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalBodyProps,
    ModalHeader,
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
    padding: "3rem",
    textAlign: 'center'
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
    marginLeft: "2.5rem",
    padding: "10px",
    textAlign: "center"
}

const containerStyle = {
    width: 1050, /* Can be in percentage also. */
    height: "auto",
    marginTop: "30px",
    padding: 50,
    position: "relative",
    background: "white",
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
    state ={
        makeDonation: false
    }
    onClick = (e) => {
        this.setState({ makeDonation: !this.state.makeDonation })
        const body = {
            'user_id': JSON.parse(window.localStorage.getItem('user')).id,
            'user_name': JSON.parse(window.localStorage.getItem('user')).name,
            'user_type': window.localStorage.getItem('user_type')
        }

        axios.post(`/api/donations/ngo/notify/${this.props.donation.user_id}`, body)
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
            <Container>
                 <Modal
                    style={{}}
                    isOpen={this.state.makeDonation}
                    toggle={this.toggle}>
                         <ModalHeader toggle={this.onClick}>Make a Donation</ModalHeader>
                    <ModalBody style={{
                        paddingTop: '20px',
                        paddingBottom: '0px',
                        display: "flex",
                        backgroundColor: 'white'}}>
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
                     
                            
                            <div style={{ float: 'right', position: 'relative', marginTop: '-40px', marginRight: '20px', zIndex: '2' }} > 
                                
            
                                <br></br>
                                    <button style={{ marginLeft: '10px', backgroundColor:'#f4ca31f7' }} type="submit" onClick={this.onSubmit}>Donate</button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            <div style={divStyle}>
                <div style={{ display: 'flex' }}>
                    <a href={'http://localhost:5000/api/users/image/ngo/' + this.props.donation.user_id}>
                        <img src={'api/users/image/ngo/' + this.props.donation.user_id} style={dpStyle}></img>
                    </a>
                    <div style={{ marginLeft: '5px', marginTop:'15px' }}>
                        <a className='linkhover' href={`/profile/ngo/${this.props.donation.user_id}`}><h6>{this.props.donation.user_name}</h6></a>
                    </div>
                </div>
                
                <div style={{marginTop:'5px', marginBottom:'5px'}}>
                
               <a href={'http://localhost:5000/api/post/image/' + this.props.files[0].filename}>
                        <CardImg top style={{ height: "200px", width: '200px', objectFit: 'cover' }} src={'api/post/image/' + this.props.files[0].filename} />
                </a>
                </div>
                <CardTitle tag="h5">{this.props.donation.name}</CardTitle>
                <CardSubtitle >
                    Amount Raised: Rs. {this.props.donation.currentAmount}<br></br> 
                    Target Amount: Rs. {this.props.donation.targetAmount}<br></br>                
                    Starts On: {this.props.donation.startDate}<br></br>
                    Ends On: {this.props.donation.endDate}</CardSubtitle>
                    
                    <CardText className="myColumn1" style={{ color:'#f4ca31f7',height:'100px', overflowY:'auto', overflowX:'hidden'}}>{this.props.donation.description}</CardText>
                    
                    {/* <a href={"https://pages.razorpay.com/pl_H2rkPEYsi0hLnB/view?donation_drive_name="+ this.props.donation.name}> */}
   {/* <Button className="foundBtn" onClick={this.onClick}>Connect</Button> */}
                    <Button  onClick={this.onClick} className="donateBtn">Donate</Button>
                    {/* </a> */}
 
                   
                </div>
                </Container>
           
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
                    <div >
                        <i class="fa fa-file-text-o fa-lg" aria-hidden="true" style={{ float: "left", marginTop: 4 }}></i><h5 style={{ fontFamily: "muli" }}> &nbsp; &nbsp;Active Donation Drives</h5>
                        <div style={{ display: 'flex', float: 'right', marginTop:'-80px'}}>
                            {window.localStorage.getItem('user_type') == 'ngo'? <NewDrive />:null}
                        </div>
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

export default connect()(DonationsPage)