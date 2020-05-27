import React, { Component } from 'react';
import { connect } from 'react-redux';
import Report from '../components/Report';
import { allReportsForLesson, removeReportForLesson } from '../services/lessons'
import { toast } from 'react-toastify';


class ReportContainer extends Component {

    componentDidMount() {
        this.fetchReports()
    }

    fetchReports = () => {
        allReportsForLesson(this.props.lessonID)
        .then(data => this.props.setReports(data))
    }

    notifyReport = () => {
        toast.success("Report Deleted", {
        position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    handleRemoveLesson = id => {
        removeReportForLesson(id).then(() => {
            this.notifyReport()
            this.fetchReports()
        })
    }

    renderReports = () => {
        if(this.props.lessonReports) {
            return this.props.lessonReports.map(report => 
                <Report 
                key={report.id}
                id={report.id}
                title={report.title}
                message={report.message} 
                handleRemoveLesson={this.handleRemoveLesson}/>
            )
        }
    }
    render() { 
        console.log(this.props);
        return (  
            <div>
                {!this.props.currentUser ? this.props.history.push('/') : null}
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