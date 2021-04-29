// import axios from 'axios';
// import React, { Component } from 'react'
// import {
//     Jumbotron,
//     Button,
//     Container,
//     Row,
//     Col,
//     Card, CardImg, CardText, CardBody,
//     CardTitle, CardSubtitle, Modal, ModalBody, ModalHeader
// } from 'reactstrap';
// import { connect } from 'react-redux';
// import AliceCarousel from 'react-alice-carousel';
// import "react-alice-carousel/lib/alice-carousel.css";
// import ChatPanel from '../components/ChatPanel';
// import LostPet from '../components/LostPet'
// import { Link } from 'react-router-dom'
// const mainStyle = {
//     position: "relative",
//     marginTop: '40px',
//     padding: "3rem"
// }

// const divStyle = {
//     width: 250,
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderColor: "rgba(0,0,0,0.1)",
//     marginTop: "3.5rem",
//     marginLeft: "3.5rem",
//     padding: "10px",
//     textAlign: "center"
// }

// const containerStyle = {
//     // width: 1050, /* Can be in percentage also. */

// }
// const customers = {
//     width: 600,
//     padding: "10px",
//     borderColor: "rgba(0,2,0,0.1)",
//     position: "relative",
//     marginTop: '20px',
//     overflow: "hidden"

// }
// const trows = {
//     width: 20,
//     padding: "10px",
//     borderColor: "rgba(0,2,0,0.1)",
//     // position: "relative",
//     marginTop: '10px',
//     textAlign: "center",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderCollapse: "collapse",
//     minWidth:210

// }
// const trows1 = {
//     width: 20,
//     padding: "10px",
//     borderColor: "rgba(0,2,0,0.1)",
//     // position: "relative",
//     marginTop: '10px',
//     textAlign: "center",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderCollapse: "collapse",
//     minWidth:300

// }
// const imageStyle = {
//     height: "8rem"
// }

// const buttonStyle = {
//     border: "None",
//     borderRadius: "20px",
//     background: "white",
//     color: "black",
//     float: 'right'
// }


// const dpStyle = {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     overflow: "hidden",
//     alignSelf: 'flex-start',
// }

// const spanStyle = {
//     float: "right",
//     marginTop: "-1.5rem"
// }

// class DisplayRequests extends Component {
//     state = {
//         chatPanel: false
//     }
   
//     onChat = (e) => {
//         this.setState({ chatPanel: !this.state.chatPanel })
//     }

//     render() {
//         return (

//            <div>
               
//                     <table style={customers}>
//                           {/* <tr>
//                             <th> Post ID</th>
//                             <th> Name of Applicant</th>
//                             <th> Status of Application</th>
//                           </tr> */}
                        
//                         <tr>
//                             <td style={trows1}> {this.props.adopter._id} </td>
//                             <td style={trows}>{this.props.adopter.name} </td>
//                             <td style={trows}> {this.props.adopter.status} </td>
//                             <td style={trows}><Link to={`/chat/${this.props.adopter.userID}`}><Button className="foundBtn" onClick={this.onChat}>Connect</Button></Link></td>
//                         </tr>
//                     </table>
                    
//                     </div>
                    
               
            
//         )
//     }
// }


// export class AdoptionRequest extends Component {

//     state = {
//         AdoptRequests: [],
//         files: [],
//     }



//     componentDidMount() {
//         // console.log('requuuu');
//         axios.get(`../api/adoption/request/${this.props.user_id}`)
//             .then((res) => {

//                 this.setState({ AdoptRequests: res.data.items})

//             });

//     }

//     render() {

//         return (
//             <Container>
//                 <div className='container' style={mainStyle}>
//                     <div style={{ height: "auto", margin: "0 auto", padding: 50, position: "relative", background: "white", }}> 
//                         <i class="fa fa-file-text-o fa-lg" aria-hidden="true" style={{ float: "left", marginTop: 4 }}></i><h5 style={{ fontFamily: "muli" }}> &nbsp; &nbsp; Applications to Your Posts </h5>
                        
//                         {/* <Button className="register" onClick={this.toggle}>View Your Application</Button> */}
//                         <span style={spanStyle}>
//                             {/* <Link to="/allitems" className='link'>All Toys </Link>| 
//                     <Link to="/stuffedanimals" className='link'> Stuffed Animals </Link>| 
//                     <Link to="/woodentoys" className='link'> Wooden Toys </Link> */}
//                         </span><hr />
                      
                        
//                         <Row>
//                         <table style={customers}>
//                           <tr>
//                             <th style={trows1}> Application ID</th>
//                             <th style={trows}> Name of Applicant</th>
//                             <th style={trows}> Status of Application</th>
//                             <th style={trows}> Connect with Owner</th>
//                           </tr>
//                         </table>
//                             {
//                                 this.state.AdoptRequests.map((adopter, i) => {
//                                     // var files = this.state.files.filter((f) => lostpet.files.includes(f._id))
//                                     return (<div>
//                                         {
//                                             <DisplayRequests adopter={adopter} key={i} onClick={this.onClick} />
                                          
//                                         }
                                         
//                                     </div>)
//                                 })
//                             }</Row></div>
//                 </div>
//             </Container>
//         )
//     }
// }

// export default connect()(AdoptionRequest)
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
    minWidth:40

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

class DisplayLostPet extends Component {
    state = {
        chatPanel: false
    }
   
    onChat = (e) => {
        this.setState({ chatPanel: !this.state.chatPanel })
    }

    render() {
        return (

           <div>
               
                    <Table hover >
                         
                        <tbody>
                            {/* <td style={trows1}> {this.props.adopter._id} </td>
                            <td style={trows}>{this.props.adopter.name} </td>
                            <td style={trows}> {this.props.adopter.age}</td>
                            <td style={trows}> {this.props.adopter.sex}</td>
                            <td style={trows}> {this.props.adopter.marital_status}</td>
                            <td style={trows}> {this.props.adopter.address}</td>
                            <td style={trows}>{this.props.adopter.description}</td>
                            <td style={trows}> {this.props.adopter.status} </td>
                            <td style={trows}><Link to={`/chat/${this.props.adopter.userID}`}><Button className="foundBtn" onClick={this.onChat}>Connect</Button></Link></td> */}

                            <tr>
                            <td> {this.props.adopter._id} </td>
                            <td>{this.props.adopter.name} </td>
                            <td> {this.props.adopter.age}</td>
                            <td> {this.props.adopter.sex}</td>
                            <td> {this.props.adopter.marital_status}</td>
                            <td> {this.props.adopter.address}</td>
                            <td>{this.props.adopter.description}</td>
                            <td> {this.props.adopter.status} </td>
                            <td><Link to={`/chat/${this.props.adopter.userID}`}><Button className="foundBtn" onClick={this.onChat}>Connect</Button></Link></td>
                            </tr>
                        </tbody>
                    </Table>
                    
                    </div>
                    
               
            
        )
    }
}


export class MyLostPetPage extends Component {

    state = {
        LostPets: [],
        files: [],
    }



    componentDidMount() {
        axios.get(`../api/request/${this.props.user_id}`)
            .then((res) => {
                console.log(this.props.user_id)
                this.setState({ LostPets: res.data.items})

            });

    }

    render() {

        return (
            <Container>
                <div className='container' style={mainStyle}>
                    <div style={{ height: "auto", margin: "0 auto", padding: 50, position: "relative", background: "white", }}> 
                        <i class="fa fa-file-text-o fa-lg" aria-hidden="true" style={{ float: "left", marginTop: 4 }}></i><h5 style={{ fontFamily: "muli" }}> &nbsp; &nbsp;Applications To Your Posts</h5>
                        
                        {/* <Button className="register" onClick={this.toggle}>View Your Application</Button> */}
                        <span style={spanStyle}>
                            {/* <Link to="/allitems" className='link'>All Toys </Link>| 
                    <Link to="/stuffedanimals" className='link'> Stuffed Animals </Link>| 
                    <Link to="/woodentoys" className='link'> Wooden Toys </Link> */}
                        </span><hr />
                      
                        
                        <Row>
                        <table style={customers}>
                          <tr>
                            <th style={trows1}> Application ID</th>
                            <th style={trows}> Name of Applicant</th>
                            <th style={trows}> Age</th>
                            <th style={trows}> Sex</th>
                            <th style={trows}> Marital Status</th>
                            <th style={trows}> Residence</th>
                            <th style={trows}> Reason for Adoption</th>
                            <th style={trows}> Status of Application</th>
                            <th style={trows}> Connect with Applicant</th>
                          </tr>
                        </table>
                            {
                                this.state.LostPets.map((adopter, i) => {
                                    // var files = this.state.files.filter((f) => lostpet.files.includes(f._id))
                                    return (<div>
                                        {
                                            <DisplayLostPet adopter={adopter} key={i}  />
                                          
                                        }
                                         
                                    </div>)
                                })
                            }</Row></div>
                </div>
            </Container>
        )
    }
}

export default connect()(MyLostPetPage)