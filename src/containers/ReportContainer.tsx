import React, { useEffect } from 'react';
import Report from '../components/Report';
import { allReportsForLesson, removeReportForLesson } from '../services/lessons'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setLessonReports } from '../store/lessonSlice';

const ReportContainer: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const lessonID = useAppSelector(state => state.lesson.lessonID);
    const lessonReports = useAppSelector(state => state.lesson.lessonReports);
    const currentUser = useAppSelector(state => state.user.currentUser);

    useEffect(() => {
        fetchReports()
    }, [])

    const fetchReports = () => {
        allReportsForLesson(lessonID)
            .then(data => dispatch(setLessonReports(data)))
    }

    const notifyReport = () => {
        toast.success("Report Deleted", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const handleRemoveLesson = (id: string) => {
        removeReportForLesson(id).then(() => {
            notifyReport()
            fetchReports()
        })
    }

    const renderReports = () => {
        if (lessonReports) {
            return lessonReports.map((report: any) => 
                <Report 
                    key={report.id}
                    id={report.id}
                    title={report.title}
                    message={report.message} 
                    handleRemoveLesson={handleRemoveLesson}/>
            )
        }
    }

    if (!currentUser) {
        navigate('/');
        return null;
    }

    return (
        <div>
            {renderReports()}
        </div>
    );
}

export default ReportContainer;