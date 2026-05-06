import React, { useEffect } from 'react';
import CLessonForm from '../components/CLessonForm';
import FadeIn from 'react-fade-in';
import IDEConsole from '../components/IDEConole';
import ReportForm from '../components/ReportForm';
import { testCodeJudge } from '../services/Judge0Api'
import PomodoroTimer from '../components/PomodoroTimer';
import { Container, Grid, Divider } from 'semantic-ui-react';
import Toast from 'light-toast';
import { Virtuoso } from 'react-virtuoso'
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearLog, addLogToConsole } from '../store/lessonSlice';

const CLessonContainer: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const CLesson = useAppSelector(state => state.lesson.CLesson);
    const classroomID = useAppSelector(state => state.classroom.classroomID);
    const console = useAppSelector(state => state.lesson.console);
    const currentUser = useAppSelector(state => state.user.currentUser);

    useEffect(() => {
        dispatch(clearLog())
    }, [dispatch])

    const handleCodeTest = (code: string, lesson_lang: string) => {
        Toast.loading('Loading')
        testCodeJudge(code, lesson_lang)
            .then(data => {
                Toast.hide()
                dispatch(addLogToConsole(data))
            })
    }

    const renderConsoleLog = () => {
        return <Virtuoso 
            style={{ width: '450px', height: '75px', border: '5px dashed gray', borderRadius: '4px' }} 
            totalCount={1} 
            item={() => <div>
                {console.map((log: any, index: number) => {
                    return <IDEConsole key={index} log={log} />
                })}
            </div>}/>
    }

    if (!currentUser) {
        navigate('/');
        return null;
    }

    const { id, title, description, boilerplate, return_value, points, deadline } = CLesson as any;

    return (
        <div>
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
                                lesson_id={id}
                                boilerplate={boilerplate} 
                                return_value={return_value} 
                                points={points}
                                classroomID={classroomID}
                                student_id={(currentUser as any).id}
                                handleCodeTest={handleCodeTest}
                                lesson_lang={(CLesson as any).language}/>
                            {renderConsoleLog()}
                        </Container>
                    </Grid.Column>
                </Grid>
                <Divider/>
                <Container textAlign='center'>
                    <PomodoroTimer />
                    <Divider/>
                    <h2>Report A Problem With This Lesson</h2>
                    <ReportForm lesson_id={(CLesson as any).id} />
                </Container>
            </FadeIn>
        </div>
    );
}

export default CLessonContainer;