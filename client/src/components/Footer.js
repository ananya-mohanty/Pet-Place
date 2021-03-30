import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/main.min.css'
import '../css/style.css'
import '../css/color.css'
import '../css/responsive.css'
import logo from '../images/logo_fetch.jpeg'

export class Footer extends Component {

    render() {
        return (
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-4" style={{marginLeft: 70, marginTop: 165}}>
                            <div class="widget">
                                <div class="foot-logo">
                                    <div class="logo">
                                        <a href="" title=""><img src={logo} style={{height: 90}} /></a>
                                    </div>	
                                    {/* <p>
                                        Contribute and save an innocent life.
                                    </p> */}
                                </div>
                                <ul class="location">
                                    <li>
                                        <i class="ti-map-alt"></i>
                                        <p>33 new montgomery, CA USA 94105.</p>
                                    </li>
                                    <li>
                                        <i class="ti-mobile"></i>
                                        <p>+1-56-346 345</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-4" style={{marginTop: 180}}>
                            <div class="widget">
                                <div class="widget-title"><h4>follow</h4></div>
                                <ul class="list-style">
                                    <li><i class="fa fa-facebook-square"></i> <a href="https://web.facebook.com/shopcircut/" title="">facebook</a></li>
                                    <li><i class="fa fa-twitter-square"></i><a href="https://twitter.com/login?lang=en" title="">twitter</a></li>
                                    <li><i class="fa fa-instagram"></i><a href="https://www.instagram.com/?hl=en" title="">instagram</a></li>
                                    </ul>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-4" style={{marginTop: 180}}>
                            <div class="widget">
                                <div class="widget-title"><h4>Navigate</h4></div>
                                <ul class="list-style">
                                    <li><a href="#" title="">Donate</a></li>
                                    <li><a href="#" title="">Adopt</a></li>
                                    <li><a href="#" title="">Lost and Found</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-4" style={{marginTop: 180}}>
                            <div class="widget">
                                <div class="widget-title"><h4>useful links</h4></div>
                                <ul class="list-style">
                                    <li><a href="#" title="">About us</a></li>
                                    <li><a href="#" title="">submit route</a></li>
                                    <li><a href="#" title="">how does it work?</a></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </footer>
        )
    }
}

export default connect()(Footer)
