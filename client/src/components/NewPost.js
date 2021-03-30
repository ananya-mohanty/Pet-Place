import React, { Component } from 'react'
import { connect } from 'react-redux'
import profile from '../images/resources/admin2.jpg'
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap'
import profilepic from '../images/resources/friend-avatar10.jpg'

const imageStyle= {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: 'flex-start',
  }

export class NewPost extends Component {
    render() {
        return (
            <Container style={{
                paddingBottom: '20px',
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
                        }}>
                            <img src={profilepic} style={imageStyle}></img>
                            <form>
                                <textarea style={{ marginLeft: '5px', position: 'relative', zIndex:'1'}}
                                placeholder='write something' rows="5" cols="30"/>
                                <input type="file" id="fileUpload" style={{ visibility: 'hidden' }} />
                                <div style={{ float: 'right', position: 'relative' ,marginTop: '-40px', marginRight:'20px', zIndex: '2'}} >
                                    <label for="fileUpload"><i class="fa fa-image" /></label>
                                    <button style={{marginLeft:'10px'}} type="submit">Post</button>
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