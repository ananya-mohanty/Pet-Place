import React, { Component } from 'react'
import { connect } from 'react-redux'
import profile from '../images/resources/admin2.jpg'

export class NewPost extends Component {
    render() {
        return (
            <div class="gap gray-bg">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row" id="page-contents">
                                <div class="col-lg-3"></div>
            <div class="col-lg-6">
                <div class="central-meta">
                    <div class="new-postbox">
                        <figure>
                        <img src={profile} alt=""/>
						</figure>
                            <div class="newpst-input">
                                <form method="post">
                                    <textarea rows="2" placeholder="write something"></textarea>
                                    <div class="attachments">
                                        <ul>
                                            <li>
                                                <i class="fa fa-music"></i>
                                                <label class="fileContainer">
                                                    <input type="file"/>
												</label>
												</li>
                                                <li>
                                                    <i class="fa fa-image"></i>
                                                    <label class="fileContainer">
                                                        <input type="file"/>
															</label>
														</li>
                                                    <li>
                                                        <i class="fa fa-video-camera"></i>
                                                        <label class="fileContainer">
                                                            <input type="file"/>
															</label>
														</li>
                                                        <li>
                                                            <i class="fa fa-camera"></i>
                                                            <label class="fileContainer">
                                                                <input type="file"/>
															</label>
														</li>
                                                            <li>
                                                                <button type="submit">Post</button>
                                                            </li>
													</ul>
											</div>
								    </form>
							</div>
						</div>
                </div>
                </div>
                            </div>
                        </div></div></div></div>
            )
        }
}

export default connect()(NewPost)