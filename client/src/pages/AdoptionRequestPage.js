
import axios from 'axios';
import React, { Component } from 'react'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Table,
    Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import ChatPanel from '../components/ChatPanel';
import LostPet from '../components/LostPet'
import { Link } from 'react-router-dom'
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact"
const mainStyle = {
    position: "relative",
    marginTop: '40px',
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
const customers = {
    width: 600,
    padding: "10px",
    borderColor: "rgba(0,2,0,0.1)",
    position: "relative",
    marginTop: '20px',
    overflow: "hidden"

}
const trows = {
    width: 20,
    padding: "10px",
    borderColor: "rgba(0,2,0,0.1)",
    // position: "relative",
    marginTop: '10px',
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
    minWidth:150

}
const trows1 = {
    width: 20,
    padding: "10px",
    borderColor: "rgba(0,2,0,0.1)",
    // position: "relative",
    marginTop: '10px',
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
    minWidth:300

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


const dpStyle = {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: 'flex-start',
}

const spanStyle = {
    float: "right",
    marginTop: "-1.5rem"
}

class DisplayRequests extends Component {
    state = {
        chatPanel: false,
        postID:'',
        viewApplication:false
    }
   
    onChat = (e) => {
        this.setState({ chatPanel: !this.state.chatPanel })
    }
    onApprove = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log('hii bitchh')
        // this.props.adopter.status='Approved'
        const formData = new FormData();
        formData.status = 'Approved'
        // formData.postID = this.state.postID
        formData.applicationID = this.props.adopter._id
        // console.log(this.state.postID)
        console.log(formData)
        // axios.post(`../api/request/${this.props.adopter.userID}`, {});
        // console.log(${JSON.parse(window.localStorage.getItem('adopter')._id)})
        axios.put(`/api/request`, {formData}
        );    
        window.location.reload();

    }
    onDecline = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log('hii bitchh')
        // this.props.adopter.status='Approved'
        const formData = new FormData();
        formData.status = 'Declined'
        // formData.postID = this.state.postID
        formData.applicationID = this.props.adopter._id
        // console.log(this.state.postID)
        console.log(formData)
        // axios.post(`../api/request/${this.props.adopter.userID}`, {});
        // console.log(${JSON.parse(window.localStorage.getItem('adopter')._id)})
        axios.put(`/api/request`, {formData}
        );    
        window.location.reload();

    }
    onSubmit = (e) =>{

    }
    onView = (e) => {
        this.setState({ viewApplication: !this.state.viewApplication })
        console.log("open form")
    }
    render() {
       
        console.log('HI '+ this.props.adopter)
        return (

           <div>
                <Modal
                size="lg"
                    style={{}}
                    isOpen={this.state.viewApplication}
                    toggle={this.toggle}>
                         <ModalHeader toggle={this.onView}> Adoption Application</ModalHeader>
                    <ModalBody style={{
                        paddingTop: '20px',
                        paddingBottom: '0px',
                        display: "flex",
                        backgroundColor: 'white'}}>
                        {/* <img src={profilepic} style={imageStyle}></img> */}
                      <div>
                      <MDBContainer gradient="sunny-morning">
                  
                            <MDBListGroup style={{ width: "46rem" }} >
                                <MDBListGroupItem className="block-example border-top-left-right border-warning" >Name of the Applicant : {this.props.adopter.name}  </MDBListGroupItem>
                                <MDBListGroupItem className="block-example border-left-right border-warning">Age : {this.props.adopter.age} </MDBListGroupItem>
                                <MDBListGroupItem className="block-example border-left-right border-warning">Sex : {this.props.adopter.sex} </MDBListGroupItem>
                                <MDBListGroupItem className="block-example border-left-right border-warning">Marital Status : {this.props.adopter.marital_status} </MDBListGroupItem>
                                <MDBListGroupItem className="block-example border-left-right border-warning">Annual Income : Rs. {this.props.adopter.annualIncome} </MDBListGroupItem>
                                <MDBListGroupItem className="block-example border-left-right border-warning">Residential Address : {this.props.adopter.address} </MDBListGroupItem>
                                <MDBListGroupItem className="block-example border-left-right border-warning">Reason for Adoption : {this.props.adopter.description} </MDBListGroupItem>
                                <MDBListGroupItem className="block-example border-left-right-bottom border-warning"> Status: {this.props.adopter.status} </MDBListGroupItem>
                            </MDBListGroup>
                        </MDBContainer>

                          
                            <div style={{ float: 'right', position: 'relative', marginTop: '-40px', marginRight: '20px', zIndex: '2' }} >
                                
                                
                                <br></br><br></br>
                                {this.props.adopter.status == 'Pending' &&
                                    <Button className="approveBtn" style={{ marginLeft: '100px' }} type="submit" onClick={this.onApprove}>Approve Adoption</Button> 
                                    // <Button className="foundBtn" style={{ marginLeft: '10 0px' }} type="submit" onClick={this.onApprove}>Decline Adoption</Button>
                                }
                                
                                {this.props.adopter.status == 'Pending' &&
                                    // <Button className="foundBtn" style={{ marginLeft: '100px' }} type="submit" onClick={this.onApprove}>Approve Adoption</Button> 
                                    <Button className="declineBtn" style={{ marginLeft: '20px' }} type="submit" onClick={this.onDecline}>Decline Adoption</Button>
                                }
                            </div>
                            <br></br><br></br>
                            {/* <br></br><br></br><br></br><br></br><br></br>                             */}
                            
                        </div>
                       
                    </ModalBody>
                </Modal>
               
                    <Table hover >
                         
                        <tbody>
                        {this.props.adopter.status != 'Declined' &&
                            <tr>
                           
                            
                            <td style={trows1}> {this.props.adopter._id} </td>
                      
                            <td style={trows}>{this.props.adopter.name} </td>
                            <td style={trows}> { this.props.adopter.status} </td>
                            <td style={trows}>
                            <Button className="foundBtn" onClick={this.onView}>View </Button>
                            </td>
                            <td style = {trows}><Link to={`/chat/${this.props.adopter.userID}`}><Button className="foundBtn" onClick={this.onChat}>Connect</Button></Link></td>
                    
                            </tr>
                              }
                        </tbody>
                    </Table>
                    
                    </div>
                    
                    
               
            
        )
    }
}


export class AdoptionLists extends Component {

    state = {
        AdoptRequests: [],
        files: [],
    }



    componentDidMount() {
        axios.get(`../api/request/${this.props.user_id}`)
            .then((res) => {
                console.log(this.props.user_id)
                this.setState({ AdoptRequests: res.data.items})

            });
          
    }

    render() {

        return (
            <Container>
                <div className='container' style={mainStyle}>
                    <div style={{ height: "auto", margin: "0 auto", padding: 100, position: "relative", background: "white", }}> 
                        <i class="fa fa-file-text-o fa-lg" aria-hidden="true" style={{ float: "left", marginTop: 4 }}></i><h5 style={{ fontFamily: "muli" }}> &nbsp; &nbsp;Applications To Your Posts</h5>
                        
                        {/* <Button className="register" onClick={this.toggle}>View Your Application</Button> */}
                        <span style={spanStyle}>
                        </span><hr />
                      
                        
                        <Row>

                        <table style={customers}>
                          <tr>
                            <th style={trows1}> Application ID</th>
                            <th style={trows}> Name of Applicant</th>
                            <th style={trows}> Status of Application</th>
                            <th style={trows}> View Application</th>
                            <th style={trows}> Connect with Applicant</th>
                          </tr>
                        </table>
                            {
                                this.state.AdoptRequests.map((adopter, i) => {
                                    // var files = this.state.files.filter((f) => lostpet.files.includes(f._id))
                                    return (<div>
                                        {
                                            <DisplayRequests adopter={adopter} key={i}  />
                                          
                                        }
                                         
                                    </div>)
                                })
                            }</Row>
                            </div>
                </div>
            </Container>
        )
    }
}

export default connect()(AdoptionLists)