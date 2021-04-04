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
    overflow: "hidden",
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
        this.state.numfiles = e.target.files.length
        console.log(this.state.numfiles)
        var i=0
        var src=[]
        var files=[]
        var filetype=[]
        while (i<this.state.numfiles)
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

    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        var file_json = JSON.stringify(this.state.files);
        formData.append('caption', this.state.caption)
        formData.append('filetype', this.state.filetype)
        formData.append('num_files', this.state.numfiles)
        
        for (let i=0; i<this.state.numfiles;i++) {
            formData.append('files[]', this.state.files[i])
        }

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        axios.post('api/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        
    }
    render() {
        return (
            <Container style={{
                marginTop: '40px',
                paddingBottom: '10px',
                paddingTop: '50px',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
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
                                <textarea style={{ marginLeft: '5px', position: 'relative', zIndex: '1' }}
                                    placeholder='write something'
                                    rows="5" cols="20"
                                    name='caption'
                                    onChange={this.onTextChange} />
                                <input type="file" name='files' id="files" style={{ visibility: 'hidden' }} onChange={this.onFileChange} multiple />
                                <div style={{ float: 'right', position: 'relative', marginTop: '-40px', marginRight: '20px', zIndex: '2' }} >
                                    {this.state.filesrc.map((src, idx) => {
                                        return (
                                        this.state.filetype[idx] == 'png' || this.state.filetype[idx] == 'jpeg' || this.state.filetype[idx] == 'jpg' ?
                                            <img src={src} style={{
                                                width: '30px',
                                                height: '30px', border: '1px solid black', borderRadius: '5px',
                                                marginLeft: '5px'
                                            }} /> :
                                            // this.state.filetype[idx] == 'mp4' || this.state.filetype[idx] == 'ogg' || this.state.filetype[idx] == 'webm' ?
                                                <video 
                                                    height='30px'><source src={src} /></video>
                                        
                                    )})}
                                    <br></br>
                                    <label for="files"><i class="fa fa-image" /></label>
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