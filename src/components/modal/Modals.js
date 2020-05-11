import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const modalStyle = {
  marginTop:'150px'
}

const style = {
  marginLeft:'200px'
}

export default class Modals extends Component {

    constructor(){
        super()
        this.state={
            setOpen:false,
            points:0,
            hasPoints:false
        }
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
      const open = this.props.open
      if(open === true && localStorage.getItem('points')){
         this.setState({setOpen:true})
         this.setState({hasPoints:true})
      }
      this.setState({points:localStorage.getItem('points')})
    }


    handleClose(){
      this.setState({setOpen:false})
      localStorage.removeItem('points');
    }

    render() {
     const {hasPoints} = this.state

      if(hasPoints){
        return(
          <Modal style={modalStyle} show={this.state.setOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={style}>Quiz</Modal.Title>
          </Modal.Header>
        <Modal.Body >You got {this.state.points} questions right</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>  
        )   
      }
   return(
      <Modal style={modalStyle} show={this.state.setOpen} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={style}>Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body >Good Luck with the Quiz :)</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>      
        )
    }
}
