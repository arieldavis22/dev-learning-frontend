import React, { Component } from 'react';
import { checkCodeJudge, correctAnswerJudge, wrongAnswerJudge } from '../services/Judge0Api'
import { Button, Form } from 'semantic-ui-react'
import '../IDE.css'
import { connect } from 'react-redux';


class CLessonForm extends Component {
    state = {  
        code: "",
        return_value: this.props.return_value,
        lesson_lang: this.props.lesson_lang
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()

        checkCodeJudge(this.state)
        .then(data => {
            if(data.message === "Correct") {

                alert("Correct Answer")
                correctAnswerJudge(this.props.classroomID, this.props.student_id, this.props.points)
                .then(() => {
                    this.props.history.push('/')
                })

            } else {

                alert("Incorrect Answer")
                wrongAnswerJudge(this.props.classroomID, this.props.student_id, this.props.points)
                .then(console.log)
                
            }
        })
    }


    render() { 
        console.log(this.state)
        return (  
            <div>
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.TextArea className="IDE" style={{width: '450px', height: '600px'}} name="code" onChange={this.handleOnChange} placeholder={this.props.boilerplate} />
                    <Button type='button' onClick={() => this.props.handleCodeTest(this.state.code, this.state.lesson_lang)}>Test Code</Button>
                    <Button color={this.props.menu ? 'purple' : null} type='submit'>Turn in Lesson</Button>
                </Form>
                {/* <form onSubmit={this.handleOnSubmit}>
                    <textarea name="code" onChange={this.handleOnChange} placeholder={this.props.boilerplate} />
                    <button type="button" onClick={() => this.props.handleCodeTest(this.state.code, this.state.lesson_lang)}>Run Code</button>
                    <input type="Submit" />
                </form> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.app.menu
})

export default connect(mapStateToProps)(CLessonForm);