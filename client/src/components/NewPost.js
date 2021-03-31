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
        file: null,
        ext: null,
        caption: '',
        filetype: ''
    }
    onFileChange = e => {
        this.setState({ file: e.target.files[0] });
    };

    onTextChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        this.state.filetype = this.state.file.name.split('.').pop();
        formData.append('file', this.state.file);
        formData.append('caption', this.state.caption)
        formData.append('filetype', this.state.filetype)
        axios.post('api/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        window.location.reload();
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
                                <input type="file" id="fileUpload" style={{ visibility: 'hidden' }} onChange={this.onFileChange} />
                                <div style={{ float: 'right', position: 'relative', marginTop: '-40px', marginRight: '20px', zIndex: '2' }} >
                                    <label for="fileUpload"><i class="fa fa-image" /></label>
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