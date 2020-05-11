import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const text = {
    marginTop: '150px',
    textAlign: 'center'
}
const styleColor = {
    background: 'lightgray',
    marginBottom: '50px',
    padding: '50px'
}
const styleCol = {
    margin: '10px',
    width: '400px',
    border: '3px solid black'
}

export default class Answer extends Component {

    constructor() {
        super();
        this.state = {
            perguntas: [],
            aswner: [],
            correct: '',
            question: '',
            goToNext: false,
            points: 0,
            questionNumber:0,
            isCorrect:false,
            isCorrectShow:false
        }
        this.onClick = this.onClick.bind(this);
        this.onHandlePage = this.onHandlePage.bind(this);
    }



    componentDidMount() {
        axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
            .then(result => {
                const aux = this.state.questionNumber;
                this.setState({ perguntas: result.data.results });
                this.setState({ correct: result.data.results[aux].correct_answer })
                this.setState({ question: result.data.results[aux].question })
                const correct = result.data.results[aux].correct_answer
                this.setState({ aswner: result.data.results[aux].incorrect_answers });
                this.setState(state => ({
                    aswner: state.aswner.concat([correct])
                }))
                this.setState({questionNumber:this.state.questionNumber + 1})
            })
    }
    onClick(event) {
        if (event.target.value === this.state.correct) {
            this.setState({points:this.state.points + 1})
           this.setState({goToNext:true})
           this.setState({isCorrect:true})
           this.setState({isCorrectShow:true})
        } else {
            this.setState({goToNext:true})
            this.setState({isCorrect:false})
            this.setState({isCorrectShow:true})
        }
    }

    onHandlePage(){
        this.setState({questionNumber:this.state.questionNumber + 1})
        const questionNumber = this.state.questionNumber
        if(questionNumber<=9){
            this.setState({ correct: this.state.perguntas[questionNumber].correct_answer })
            this.setState({ question: this.state.perguntas[questionNumber].question })
            const correct = this.state.perguntas[questionNumber].correct_answer
            this.setState({ aswner: this.state.perguntas[questionNumber].incorrect_answers });
            this.setState(state => ({
                aswner: state.aswner.concat([correct])
            }))
            this.setState({goToNext:false})
            this.setState({isCorrectShow:false})
        }     
    }

    componentDidUpdate(){
     if(this.state.questionNumber > 10){
          localStorage.setItem('points',this.state.points);
          window.location.reload();
      }
     
    }
    render() {
        const { goToNext,isCorrect,isCorrectShow } = this.state

        const renderButton = () => {
            if (goToNext) {
                return (
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Button variant="contained" style={styleCol} onClick={this.onHandlePage} color="primary">Go To Next</Button>
                        </Col>
                    </Row>
                )
            }
        }
        const renderRespost = ()=>{
            if(isCorrect){
                return(
                    <div>
                      <h3 style={{color:"green"}}>{this.state.correct}</h3>
                    </div>
                )
            }else{
                return(
                    <div>
                      <h3 style={{color:"red"}}>{this.state.correct}</h3>
                    </div>
                )
            }
        }

        return (
            <Container style={text}>
                <Row>
                    <Col style={styleColor} md={{ span: 6, offset: 3 }}>
                        <h3>Answer</h3>
                      <p>{this.state.question}</p>
                    </Col>
                </Row>
                {isCorrectShow
                  ?<div>{renderRespost()}</div>
                  :<Row md={{ span: 6, offset: 3 }}>
                  {
                      this.state.aswner.map((asn,index) => (
                          <Col key={index}  md={6}>
                          <input type="Button" readOnly style={styleCol} id="answers" value={asn} onClick={this.onClick}></input>
                          </Col>
                      ))
                  }
              </Row>  
                }
                {renderButton()}
            </Container>
        )
    }
}
