import React, { Component } from 'react';
import { connect } from 'react-redux';
import Report from '../components/Report';


class ReportContainer extends Component {

    fetchReports = () => {
        fetch("http://localhost:3000/reports-for-lesson", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                lesson_id: this.props.lessonID
            })
        })
        .then(r => r.json())
        .then(data => this.props.setReports(data))
    }

    componentDidMount() {
        this.fetchReports()
    }

    handleRemoveLesson = id => {
        fetch("http://localhost:3000/delete-report", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                report_id: id
            })
        })
        .then(r => r.json())
        .then(() => this.fetchReports())
    }

    renderReports = () => {
        return this.props.lessonReports.map(report => 
            <Report 
            key={report.id}
            id={report.id}
            title={report.title}
            message={report.message} 
            handleRemoveLesson={this.handleRemoveLesson}/>
        )
    }
    render() { 
        console.log(this.props);
        return (  
            <div>
                {this.renderReports()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    lessonID: state.lesson.lessonID,
    lessonReports: state.lesson.lessonReports
})

const mapDispatchToProps = dispatch => ({
    setReports: report => dispatch({type: "SET_LESSON_REPORTS", report})
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);