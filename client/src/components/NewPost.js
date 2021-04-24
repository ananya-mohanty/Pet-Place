import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap'
import profilepic from '../images/resources/friend-avatar10.jpg'

const imageStyle = {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'flex-start',
}

export class NewPost extends Component {
    state = {
        files: [],
        filesrc: [],
        ext: null,
        numfiles: 0,
        caption: '',
        filetype: []
    }
    onFileChange = e => {
        var prev = this.state.numfiles
        this.state.numfiles += e.target.files.length
        // console.log(this.state.numfiles)
        var i=0
        var src = this.state.filesrc
        var files=this.state.files
        var filetype = this.state.filetype
        while (i<this.state.numfiles-prev)
        {
            files.push(e.target.files[i]);
            filetype.push(e.target.files[i].name.split('.').pop());
            src.push(URL.createObjectURL(e.target.files[i]))
            i++
        }
        this.setState({filesrc:src, files:files, filetype:filetype})
    };

    onTextChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('caption', this.state.caption)
        console.log(window.localStorage.getItem('user'))
        formData.append('user', window.localStorage.getItem('user'))
        for (let i=0; i<this.state.numfiles;i++) {
            formData.append('files[]', this.state.files[i])
        }

        for (var pair of formData.entries()) {
            // console.log(pair[0] + ', ' + pair[1]);
        }
        axios.post('api/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token':window.localStorage.getItem('token')
            }
        })
        setTimeout(function() { 
            window.location.reload()
        }, 2000)
    }

    render() {
        return (
            <Container style={{
                marginTop: '40px',
                paddingBottom: '10px',
                paddingTop: '50px',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: '800px'
            }}>
                <Row>
                    <Col>
                        <Jumbotron style={{
                            paddingTop: '20px',
                            paddingBottom: '0px',
                            display: "flex",
                            backgroundColor: 'white'
                        }}>
                            <img src={profilepic} style={imageStyle}></img>
                            <form>
                                <textarea style={{ marginLeft: '15px', position: 'relative', zIndex: '1' }}
                                    placeholder='write something'
                                    rows="5" cols="20"
                                    name='caption'
                                    onChange={this.onTextChange} />
                                <input type="file" name='files' id="img" accept="image/*" style={{ visibility: 'hidden' }} onChange={this.onFileChange} multiple />
                                <input type="file" name='files' id="vid" accept="video/*"style={{ visibility: 'hidden' }} onChange={this.onFileChange} multiple />
                                <input type="file" name='files' id="doc" accept="application/*, text/*" style={{ visibility: 'hidden' }} onChange={this.onFileChange} multiple />

                                <div style={{ float: 'right', position: 'relative', marginTop: '-40px', marginRight: '20px', zIndex: '2' }} >
                                    {this.state.filesrc.map((src, idx) => {
                                        return (
                                        this.state.filetype[idx] == 'png' || this.state.filetype[idx] == 'jpeg' || this.state.filetype[idx] == 'jpg' ?
                                            <img src={src} style={{
                                                width: '30px',
                                                height: '30px', border: '1px solid black', borderRadius: '5px',
                                                marginLeft: '5px',
                                                marginBottom: '20px'
                                            }} /> :
                                            this.state.filetype[idx] == 'mp4' || this.state.filetype[idx] == 'ogg' || this.state.filetype[idx] == 'webm' ?
                                                <video 
                                                        style={{
                                                            width: '30px',
                                                            height: '30px', border: '1px solid black', borderRadius: '5px',
                                                            marginLeft: '5px'}}><source src={src} /></video>:
                                                    <embed style={{
                                                        width: '30px',
                                                        height: '30px', border: '1px solid black', borderRadius: '5px',
                                                        marginLeft: '5px',
                                                    }}  name="plugin" src={src} type="application/pdf"/>
                                    )})}
                                    <br></br>
                                    <label for="img"><i class="fa fa-image" /></label>&nbsp;&nbsp;
                                    <label for="vid"><i class="fa fa-video-camera" /></label>&nbsp;&nbsp;
                                    <label for="doc"><i class="fa fa-file" /></label>&nbsp;&nbsp;

                                    <button style={{ marginLeft: '10px' }} type="submit" onClick={this.onSubmit}>Post</button>
                                </div>
                            </form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect()(NewPost)