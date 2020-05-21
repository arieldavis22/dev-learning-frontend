import React, { Component } from 'react';
import { connect } from 'react-redux';
import CLessonForm from '../components/CLessonForm';
import FadeIn from 'react-fade-in';
import IDEConsole from '../components/IDEConole';

class CLessonContainer extends Component {

    componentDidMount() {
        this.props.clearConsole()
    }

    handleCodeTest = (code) => {
        fetch("http://localhost:3000/test-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                code: code
            })
        })
        .then(r => r.json())
        .then(data => {
            this.props.addToConsole(data)
            this.forceUpdate()
        })
    }

    renderConsoleLog = () => {
        return this.props.console.map(log => 
            <IDEConsole log={log} />
        )
    }

    render() { 
        console.log("CLesson COntainer:", this.props)
        const { title, description, boilerplate, return_value, points, deadline } = this.props.CLesson
        return (  
            <div>
                <FadeIn>
                <h1>{title}</h1>
                <p>{description}</p>
                <h5>Points worth: {points}</h5>
                <h5>Deadline: {deadline}</h5>
                <CLessonForm 
                boilerplate={boilerplate} 
                return_value={return_value} 
                points={points}
                classroomID={this.props.classroomID}
                student_id={this.props.currentUser.id}
                handleCodeTest={this.handleCodeTest}/>
                {this.renderConsoleLog()}
                </FadeIn>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    CLesson: state.lesson.CLesson,
    classroomID: state.classroom.classroomID,
    console: state.lesson.console
})

const mapDispatchToProps = dispatch => ({
    addToConsole: line => dispatch({type: "ADD_LOG_TO_CONSOLE", line}),
    clearConsole: () => dispatch({type: "CLEAR_LOG"})
})

export default connect(mapStateToProps, mapDispatchToProps)(CLessonContainer);