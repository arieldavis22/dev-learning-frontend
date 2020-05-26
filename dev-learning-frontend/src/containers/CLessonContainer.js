import React, { Component } from 'react';
import { connect } from 'react-redux';
import CLessonForm from '../components/CLessonForm';
import FadeIn from 'react-fade-in';
import IDEConsole from '../components/IDEConole';
import ReportForm from '../components/ReportForm';
import { testCodeJudge } from '../services/Judge0Api'
import PomodoroTimer from '../components/PomodoroTimer';
import { Container, Grid } from 'semantic-ui-react';


class CLessonContainer extends Component {

    componentDidMount() {
        this.props.clearConsole()
    }

    handleCodeTest = (code, lesson_lang) => {
        testCodeJudge(code, lesson_lang)
        .then(data => {
            this.props.addToConsole(data)
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
                {!this.props.currentUser ? this.props.history.push('/') : null}
                <FadeIn>
                    <Grid columns={2} divided>

                        <Grid.Column width={7}>

                            <Container textAlign='left'>
                                <h1>{title}</h1>
                                <p>{description}</p>
                                <h5>Points worth: {points}</h5>
                                <h5>Deadline: {deadline}</h5>
                            </Container>

                        </Grid.Column>
                        <Grid.Column>
                        <Container textAlign='right'>
                            <CLessonForm 
                            boilerplate={boilerplate} 
                            return_value={return_value} 
                            points={points}
                            classroomID={this.props.classroomID}
                            student_id={this.props.currentUser.id}
                            handleCodeTest={this.handleCodeTest}
                            lesson_lang={this.props.CLesson.language}
                            history={this.props.history}/>
                            {this.renderConsoleLog()}
                        </Container>
                        </Grid.Column>
                    </Grid>

                <PomodoroTimer />

                <h2>Report This Lesson</h2>
                <ReportForm lesson_id={this.props.CLesson.id} />
                </FadeIn>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    CLesson: state.lesson.CLesson,
    classroomID: state.classroom.classroomID,
    console: state.lesson.console,
})

const mapDispatchToProps = dispatch => ({
    addToConsole: line => dispatch({type: "ADD_LOG_TO_CONSOLE", line}),
    clearConsole: () => dispatch({type: "CLEAR_LOG"})
})

export default connect(mapStateToProps, mapDispatchToProps)(CLessonContainer);