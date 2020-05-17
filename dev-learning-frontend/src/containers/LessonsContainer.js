import React, { Component } from 'react';
import LessonForm from '../components/LessonForm';
import {connect} from 'react-redux'

class LessonsContainer extends Component {
    state = {  }
    render() { 
        return (  
            <div>
                Lessosn container
                <LessonForm currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonsContainer);