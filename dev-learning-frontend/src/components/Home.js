import React from 'react';
import StudentHomeContainer from '../containers/StudentHomeContainer';
import FadeIn from 'react-fade-in';
import MainMenu from './MainMenu';
import { Container } from 'semantic-ui-react'
import TeacherHomeContainer from '../containers/TeacherHomeContainer';

const Home = (props) => {
    const {currentUser} = props
    return (  
        <div>
            {!currentUser ? <MainMenu /> : null}
            {currentUser  ? 
            <div>

                <FadeIn>
                    <Container textAlign='center'>
                        <h1>Welcome back, {currentUser.first_name} {currentUser.last_name}</h1> 
                    </Container>
                </FadeIn>

                {currentUser.role === "Student" ? 
                <div>
                    <FadeIn>
                    <StudentHomeContainer currentUser={currentUser}/>
                    </FadeIn>
                </div> : null}

                {currentUser.role === "Teacher" ?
                <div>

                    <FadeIn>
                        <Container textAlign='center'>
                            <TeacherHomeContainer />
                        </Container>
                    </FadeIn>
                </div> : null}

            </div> : null}
        </div>
    );
}

export default Home;

// class Home extends Component {
//     render() { 
//         return (  
            // <div>
            //     {!this.props.currentUser ? <MainMenu /> : null}
            //     {this.props.currentUser  ? 
            //     <div>
            //         <FadeIn>
            //             <Container textAlign='center'>
            //                 <h1>Welcome back, {this.props.currentUser.first_name} {this.props.currentUser.last_name}</h1> 
            //             </Container>
            //         </FadeIn>
            //         {this.props.currentUser.role === "Student" ? 
            //         <div>
            //             <FadeIn>
            //             <StudentHomeContainer currentUser={this.props.currentUser}/>
            //             </FadeIn>
            //         </div>
            //         : 
            //         null}
            //         {this.props.currentUser.role === "Teacher" ?
            //         <div>
            //             <FadeIn>
            //                 <Container textAlign='center'>
            //                     <TeacherHomeContainer />
            //                 </Container>
            //             </FadeIn>
            //         </div>
            //         : 
            //         null}
            //     </div>
            //     : null}
            // </div>
//         );
//     }
// }

// export default Home;