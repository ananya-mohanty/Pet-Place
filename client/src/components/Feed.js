import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import FeedPost from '../components/FeedPost'

export class Feed extends Component {
    state={
        posts:[]
    }
     
    componentDidMount() {
        axios.get('api/post')
            .then(res => {
                this.setState({ posts: res.data })
            });
    }
    render() {
        console.log(this.state)
        return (
            this.state.posts.map((post, i) => {
                return (<div>
                    {  
                        <FeedPost post={post} key={i} />
                    }
                </div>)
            }
         )
        )
    }
}
export default connect()(Feed)