import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import Modal from './components/modal/Modals';
import{Container,Row,Col} from 'react-bootstrap';
import Answer from './components/answer/Answer';


export default class App extends Component {

  constructor(){
    super()
    this.state={
      open:true
    }
  }

  componentDidMount(){
   
  }

  render() {
    return (
      <div>
        <Modal open={this.state.open}></Modal>
       <Container>
         <Row>
         <Col><Answer></Answer></Col>
         </Row>
       </Container>
      </div>
    )
  }
}

