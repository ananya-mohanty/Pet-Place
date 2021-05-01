import React, { Component } from 'react'
// import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';
import logo from '../images/logo_fetch.jpeg'
import '../App.css'
import { Link } from 'react-router-dom';
import { connect, PromiseState } from 'react-refetch'
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Navbar2 extends Component {

    state = {
        isOpen: false,
        bg: 'beige',
        tg: '#e75480',
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    prev = null
    prevnotif = null

    componentDidUpdate() {
        // console.log(this.prev)
        if(this.props.unread_messages.value!=this.prev && this.prev!=null) {
            if(this.props.unread_messages.value>0)
            {
                if(this.props.unread_messages.value == 1)
                toast.info(`New messages from ${this.props.unread_messages.value} chat`)
                else
                toast.info(`New messages from ${this.props.unread_messages.value} chats`)
            }
            
        }
        if(this.props.notifs.value!=null && this.props.notifs.value.length>0 && JSON.stringify(this.props.notifs.value[this.props.notifs.value.length-1])!=JSON.stringify(this.prevnotif) && this.prevnotif!=null)
        {
            console.log(this.prevnotif)
            console.log(this.props.notifs.value[this.props.notifs.value.length-1])
            toast.info(`Looks like ${this.props.notifs.value[this.props.notifs.value.length-1].user_name} has found your pet!`)
        }
        this.prev = this.props.unread_messages.value
        if(this.props.notifs.value!=null && this.props.notifs.value.length>0)
        this.prevnotif = this.props.notifs.value[this.props.notifs.value.length-1]
    }

    render() {
        return (
            <div>
                <Navbar fixed="top" color="white" light expand="md" style={{ boxShadow: `0px 0px 5px rgba(0, 0, 0, 0.2)` }}>
                    <NavbarBrand href="/"><img src={logo} style={{ marginLeft: 15, marginRight: 10, marginTop: -8, height: 45 }} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem style={{ marginRight: 25 }}>
                                <NavLink href="/" style={{ fontFamily: 'muli', fontSize: '16px' }}>Home</NavLink>
                            </NavItem>
                            <NavItem style={{ marginRight: 25 }}>
                                <NavLink href="/adopt" style={{ fontFamily: 'muli' }}>Adopt</NavLink>
                            </NavItem>
                            <NavItem style={{ marginRight: 25 }}>
                                <NavLink href="/donations" style={{ fontFamily: 'muli' }}>Donation Drives</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ fontFamily: 'muli' }}>
                                    Lost and Found
                                    <DropdownMenu right>
                                        <DropdownItem tag={Link} to="/lostpet" >
                                            Lost a Pet
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/foundpet" >
                                            Found a Pet
                                        </DropdownItem>
                                    </DropdownMenu>
                                </DropdownToggle>
                            </UncontrolledDropdown>
                            {/* <NavItem> */}
                            {/* <NavLink href="#"><i class="ti-home"></i></NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="#"><i class="ti-home"></i></NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="#"><i class="ti-home"></i></NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="#"><i class="ti-home"></i></NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="#"><i class="ti-home"></i></NavLink>
                    </NavItem> */}
                        </Nav>

                        <NavbarText style={{ marginRight: 30 }}><a href="/"><i class="ti-home"></i></a></NavbarText>
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret style={{ fontFamily: 'muli' }}>
                                <NavbarText style={{ marginRight: 30 }}><a href="#"><i class="ti-bell"></i>{this.props.notifs.value && this.props.notifs.value.length > 0 ?
                                    <span style={{ marginLeft: 2, fontSize: 11, color: 'white', backgroundColor: '#45b1e8', borderRadius: '50%' }}>&nbsp;{this.props.notifs.value.length}&nbsp;</span>
                                    : null}</a>
                                </NavbarText>
                                <DropdownMenu>
                                    {this.props.notifs.value ?
                                        this.props.notifs.value.map((n, i) => {
                                            return (
                                                <div>
                                                    <DropdownItem tag={Link} to={`chat/${n.user_id}`} >
                                                        Looks like {n.user_name} has found your pet.
                                                </DropdownItem>
                                                    {window.localStorage.getItem('user_type') == 'user' ? <Button size='sm' style={{ float: 'right', marginRight: '20px' }} onClick={() => {
                                                        axios.delete(`/api/users/notifications/${JSON.parse(window.localStorage.getItem('user')).id}/${n._id}`)
                                                    }}>
                                                        &#10003;
                                                    </Button> : <Button size='sm' style={{ float: 'right', marginRight: '20px' }} onClick={() => {
                                                        axios.delete(`/api/ngo/notifications/${JSON.parse(window.localStorage.getItem('user')).id}/${n._id}`)
                                                    }}>
                                                        &#10003;
                                                    </Button>}
                                                    
                                                </div>
                                               )
                                        })
                                        : null}
                                </DropdownMenu>
                            </DropdownToggle>
                        </UncontrolledDropdown>

                        <NavbarText style={{ marginRight: 30 }}><a href="/chats"><i class="ti-comment"></i>
                            {this.props.unread_messages.value > 0 ?
                                <span style={{ marginLeft: 2, fontSize: 11, color: 'white', backgroundColor: '#45b1e8', borderRadius: '50%' }}>&nbsp;{this.props.unread_messages.value}&nbsp;</span>
                                : null}
                        </a></NavbarText>
                        <NavbarText style={{ marginRight: 30 }}><a href="/profile"><i class="ti-user"></i></a></NavbarText>
                        <NavbarText style={{ marginRight: 30 }}><a href="/logout"><i class="ti-power-off"></i></a></NavbarText>
                    </Collapse>
                </Navbar>
                <ToastContainer position="top-center" autoClose={3000} />
            </div>
        )
    }
}

// export default connect()(Navbar2)
export default connect(props => ({
    unread_messages: { url: `api/messages/unread/${JSON.parse(window.localStorage.getItem('user')).id}`, refreshInterval: 6000 },
    notifs: { url: `api/${window.localStorage.getItem('user_type')}/notifications/${JSON.parse(window.localStorage.getItem('user')).id}`, refreshInterval: 2000 },
}))(Navbar2)
// export default Navbar2