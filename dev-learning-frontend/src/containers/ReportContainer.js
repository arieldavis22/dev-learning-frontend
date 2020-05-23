import React, { Component } from 'react';
import { connect } from 'react-redux';
import Report from '../components/Report';
import { allReportsForLesson, removeReportForLesson } from '../services/lessons'


class ReportContainer extends Component {

    componentDidMount() {
        this.fetchReports()
    }

    fetchReports = () => {
        allReportsForLesson(this.props.lessonID)
        .then(data => this.props.setReports(data))
    }

    handleRemoveLesson = id => {
        removeReportForLesson(id).then(() => this.fetchReports())
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