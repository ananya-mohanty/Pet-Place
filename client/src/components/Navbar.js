import React, { Component } from 'react'
import { connect } from 'react-redux'
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
} from 'reactstrap';
import logo from '../images/logo_fetch.jpeg'
import '../App.css'
import { Link } from 'react-router-dom';



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

                        <NavbarText style={{ marginRight: 30 }}><a href="#"><i class="ti-home"></i></a></NavbarText>
                        <NavbarText style={{ marginRight: 30 }}><a href="#"><i class="ti-bell"></i></a></NavbarText>
                        <NavbarText style={{ marginRight: 30 }}><a href="/chats"><i class="ti-comment"></i></a></NavbarText>
                        <NavbarText style={{ marginRight: 30 }}><a href="#"><i class="ti-user"></i></a></NavbarText>
                        <NavbarText style={{ marginRight: 30 }}><a href="#"><i class="ti-power-off"></i></a></NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default connect()(Navbar2)