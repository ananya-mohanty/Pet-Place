import React, { Component } from 'react'
import { connect } from 'react-redux'
import avatar from '../images/resources/friend-avatar10.jpg'
import post from '../images/resources/user-post.jpg'

export class FeedPosts extends Component {
    render() {
        return (
            <div class="gap gray-bg">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row" id="page-contents">
                                <div class="col-lg-3"></div>
                                <div class="col-lg-6">
                                    <div class="loadMore">
                                        <div class="central-meta item">
                                            <div class="user-post">
                                                <div class="friend-info">
                                                    <figure>
                                                        <img src={avatar} alt="" />
                                                    </figure>
                                                    <div class="friend-name">
                                                        <ins><a href="time-line.html" title="">Janice Griffith</a></ins>
                                                        <span>published: june,2 2018 19:PM</span>
                                                    </div>
                                                    <div class="post-meta">
                                                        <img src={post} alt="" />
                                                        <div class="we-video-info">
                                                            <ul>
                                                                <li>
                                                                    <span class="views" data-toggle="tooltip" title="views">
                                                                        <i class="fa fa-eye"></i>
                                                                        <ins>1.2k</ins>
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span class="like" data-toggle="tooltip" title="like">
                                                                        <i class="ti-heart"></i>
                                                                        <ins>2.2k</ins>
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span data-toggle="tooltip" title="applications">
                                                                        <i class="fa fa-user"></i>
                                                                        <ins>200</ins>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="description">

                                                            <p>
                                                                World's most beautiful car in Curabitur <a href="#" title="">#test drive booking !</a> the most beatuiful car available in america and the saudia arabia, you can book your test drive by our official website
													</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div></div></div></div>
        )
    }
}

export default connect()(FeedPosts)