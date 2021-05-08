import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import FeedPost from '../components/FeedPost'
import {
    Container,
} from 'reactstrap'
import "react-alice-carousel/lib/alice-carousel.css";

export class AdoptFeed extends Component {
    state = {
        posts: [],
        files: [],
    }

    componentDidMount = () => {
        axios.get('api/post/available')
            .then(res => {
                this.setState({ posts: res.data.items, files: res.data.files })
            }).catch(res => {
                window.location.href = '/login'
            }
            );

    }
    render() {
        return (
            <div style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 90,}}>
                <div style={{ justifyContent: 'center', alignItems: 'center',display:'flex'}}>
                    <h1 >Adopt Me!!</h1><br></br><br></br>
                </div>
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', color:'coral'}}>
                    <h3>We both need the Love &#10084;</h3>

                </div>
                
                <Container className="myColumn1" style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 90, marginTop: 10, height: '1300px', overflowY: 'scroll', overflowX: 'auto', position: '' }}>

                    {this.state.posts.map((post, i) => {
                        var files = this.state.files.filter((f) => post.files.includes(f._id))
                        return (<div>
                            {
                                <FeedPost post={post} files={files} key={i} width='700px' words='650' />
                            }
                        </div>)
                    })}
                </Container>
            </div>
            
        )
    }
}
export default connect()(AdoptFeed)