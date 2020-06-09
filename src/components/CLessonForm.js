import React, { Component } from 'react';
import { checkCodeJudge, correctAnswerJudge, wrongAnswerJudge } from '../services/Judge0Api'
import { Button, Form } from 'semantic-ui-react'
import '../IDE.css'
import { connect } from 'react-redux';
import Toast from 'light-toast';
import { toast } from 'react-toastify';


class CLessonForm extends Component {
    state = {  
        code: "",
        return_value: this.props.return_value,
        lesson_lang: this.props.lesson_lang,
        lesson_id: this.props.lesson_id,
        student_id: this.props.student_id
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    notifyCorrect = () => {
        toast.success("Answer Correct", {
        position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    notifyWrong = () => {
        toast.error("Answer Wrong", {
        position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        Toast.loading('Loading')
        checkCodeJudge(this.state)
        .then(data => {
            if(data.message === "Correct") {

                // alert("Correct Answer")
                correctAnswerJudge(this.props.classroomID, this.props.student_id, this.props.points)
                .then(() => {
                    Toast.hide()
                    this.notifyCorrect()
                    this.props.history.push('/')
                })

            } else {

                // alert("Incorrect Answer")
                wrongAnswerJudge(this.props.classroomID, this.props.student_id, this.props.points)
                .then(() => {
                    Toast.hide()
                    this.notifyWrong()
                    this.props.history.push('/')
                })
                
            }
        })
    }


    render() { 
        // console.log("CLFORM PROPS:",this.state)
        return (  
            <div>
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.TextArea className="IDE" style={{width: '450px', height: '425px'}} name="code" onChange={this.handleOnChange} placeholder={this.props.boilerplate} />
                    <Button type='button' onClick={() => this.props.handleCodeTest(this.state.code, this.state.lesson_lang)}>Test Code</Button>
                    <Button color={this.props.menu ? 'purple' : null} type='submit'>Turn in Lesson</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.app.menu
})

export default connect(mapStateToProps)(CLessonForm);