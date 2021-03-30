import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/main.min.css'
import '../css/style.css'
import '../css/color.css'
import '../css/responsive.css'
import logo from '../images/logo_fetch.jpeg'

export class Navbar extends Component {

    render() {
        return (
        <div class="theme-layout">
            <div class="topbar stick">
                <div class="logo">
                    <a title="" href="#"><img src={logo} style={{marginLeft: -20, marginRight: 40, height: 60}} /></a>
                </div>
                
                <div class="top-area" style={{marginLeft: -20}}>
                    <ul class="main-menu">
                        <li>
                            <a href="#" title="">Home</a>
                            {/* <ul>
                                <li><a href="index-2.html" title="">Home Social</a></li>
                                <li><a href="index2.html" title="">Home Social 2</a></li>
                                <li><a href="index-company.html" title="">Home Company</a></li>
                                <li><a href="landing.html" title="">Login page</a></li>
                                <li><a href="logout.html" title="">Logout Page</a></li>
                                <li><a href="newsfeed.html" title="">news feed</a></li>
                            </ul> */}
                        </li>
                        <li>
                            <a href="#" title="">Donate</a>
                            {/* <ul>
                                <li><a href="time-line.html" title="">timeline</a></li>
                                <li><a href="timeline-friends.html" title="">timeline friends</a></li>
                                <li><a href="timeline-groups.html" title="">timeline groups</a></li>
                                <li><a href="timeline-pages.html" title="">timeline pages</a></li>
                                <li><a href="timeline-photos.html" title="">timeline photos</a></li>
                                <li><a href="timeline-videos.html" title="">timeline videos</a></li>
                                <li><a href="fav-page.html" title="">favourit page</a></li>
                                <li><a href="groups.html" title="">groups page</a></li>
                                <li><a href="page-likers.html" title="">Likes page</a></li>
                                <li><a href="people-nearby.html" title="">people nearby</a></li>
                            </ul> */}
                        </li>
                        <li>
                            <a href="#" title="">Adopt a Pet</a>
                            <ul>
                                <li><a href="#" title="">Cats</a></li>
                                <li><a href="#" title="">Dogs</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" title="">Lost and Found</a>
                            <ul>
                                <li><a href="#" title="">Lost a Pet</a></li>
                                <li><a href="#" title="">Found a Pet</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="setting-area">
                        <li><a href="newsfeed.html" title="Home" data-ripple=""><i class="ti-home"></i></a></li>
                        <li>
                            <a href="#" title="Notification" data-ripple="">
                                <i class="ti-bell"></i>
                            </a>
                            <div class="dropdowns">
                                <span>4 New Notifications</span>
                                <ul class="drops-menu">
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-1.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>sarah Loren</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag green">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-2.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>Jhon doe</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag red">Reply</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-3.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>Andrew</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag blue">Unseen</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-4.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>Tom cruse</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-5.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>Amy</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag">New</span>
                                    </li>
                                </ul>
                                <a href="notifications.html" title="" class="more-mesg">view more</a>
                            </div>
                        </li>
                        <li>
                            <a href="#" title="Messages" data-ripple=""><i class="ti-comment"></i><span>12</span></a>
                            <div class="dropdowns">
                                <span>5 New Messages</span>
                                <ul class="drops-menu">
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-1.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>sarah Loren</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag green">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-2.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>Jhon doe</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag red">Reply</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-3.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>Andrew</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag blue">Unseen</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-4.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>Tom cruse</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="images/resources/thumb-5.jpg" alt="" />
                                            <div class="mesg-meta">
                                                <h6>Amy</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span class="tag">New</span>
                                    </li>
                                </ul>
                                <a href="messages.html" title="" class="more-mesg">view more</a>
                            </div>
                        </li>
                        <li><a href="#" title="Languages" data-ripple=""><i class="ti-user"></i></a>
                            <div class="dropdowns languages">
                                <a href="#" title=""><i class="ti-check"></i>View Profile</a>
                                <a href="#" title="">Edit Profile</a>
                                <a href="#" title="">View History</a>
                            </div>
                        </li>
                        <li>
                        <a href="#" title=""><i class="ti-power-off"></i></a>
                        </li>
                    </ul>
                    <div class="user-img">
                        <img src="images/resources/admin.jpg" alt="" />
                        <span class="status f-online"></span>
                        {/* <div class="user-setting">
                            <a href="#" title=""><span class="status f-online"></span>online</a>
                            <a href="#" title=""><span class="status f-away"></span>away</a>
                            <a href="#" title=""><span class="status f-off"></span>offline</a>
                            <a href="#" title=""><i class="ti-user"></i> view profile</a>
                            <a href="#" title=""><i class="ti-pencil-alt"></i>edit profile</a>
                            <a href="#" title=""><i class="ti-target"></i>activity log</a>
                            <a href="#" title=""><i class="ti-settings"></i>account setting</a>
                            <a href="#" title=""><i class="ti-power-off"></i>log out</a>
                        </div> */}
                    </div>
                    {/* <span class="ti-menu main-menu" data-ripple=""></span> */}
                </div>
            </div>
        </div>
        )
    }
}


export default connect()(Navbar)