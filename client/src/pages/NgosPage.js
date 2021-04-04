import axios from 'axios';
import React, { Component } from 'react'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import WishModal from '../components/WishModal';

const mainStyle = {
    marginTop: "8rem"
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

class DisplayNgo extends Component {
    render() {
        return (
            <div>
                <Jumbotron style={JumbotronStyle}>
                    {/* <WishModal purpose={'card'} id={this.props.donation._id} /> */}
                    {/* <Button href={"/toydescription/" + this.props.item._id} style={buttonStyle}>View</Button> */}
                    {/* <img src={require(`../${this.props.donation.image}`).default} style={imageStyle}></img> */}
                    <br /><br /><h5>{this.props.ngo.name}</h5>
                    {/* <h5 style={{ color: 'hotpink' }}>
                        &#8377;{this.props.item.price}
                    </h5><br /> */}
                </Jumbotron>
            </div>
        )
    }
}


export class NgosPage extends Component {

    state = {
        Ngos: []
    }

    componentDidMount() {
        axios.get('api/ngo')
            .then((res) => {
                // console.log(res.data)
                // console.log("heloo")
                // console.log(this.state.Donations)
                this.setState({Ngos: res.data})
                // console.log(this.state.Donations)
                // this.helper(res.data)
                console.log(this.state.Ngos)
            });
        
    }

    render() {

        return (
            <div className='container' style={mainStyle}>
                <h3>All NGOs</h3>
                <span style={spanStyle}>
                    {/* <Link to="/allitems" className='link'>All Toys </Link>| 
                    <Link to="/stuffedanimals" className='link'> Stuffed Animals </Link>| 
                    <Link to="/woodentoys" className='link'> Wooden Toys </Link> */}
                    </span><hr />
                <Row>
                {
                    
                    this.state.Ngos.map((ngo, i) => {
                         return (<div>
                            {
                                <DisplayNgo ngo={ngo} key={i} />
                            }
                        </div>)
                    })
                }</Row>
            </div>
        )
    }
}

export default connect()(NgosPage)