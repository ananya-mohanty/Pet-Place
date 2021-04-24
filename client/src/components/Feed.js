import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import FeedPost from '../components/FeedPost'

export class Feed extends Component {
    state={
        posts:[],
        files:[]
    }
     
    componentDidMount = ()=> {
        axios.get('api/post')
            .then(res => {
                this.setState({ posts: res.data.items, files: res.data.files })
            });
    }
    render() {
        return (
            this.state.posts.map((post, i) => {
                var files = this.state.files.filter((f) => post.files.includes(f._id))
                // console.log(files)
                return (<div>
                    { 
                        <FeedPost post={post} files={files} key={i} />
                    }
                </div>)
            }
         )
        )
    }
}
export default connect()(Feed)