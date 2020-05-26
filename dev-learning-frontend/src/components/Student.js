import React, { Component } from 'react';
import { findStudentGPA } from '../services/users'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

class Student extends Component {

    state = {
        student_point_average: ''
    }

    componentDidMount() {
        if(this.props.classroom_id) {
            findStudentGPA(this.props.classroom_id, this.props.id)
            .then(data => {
                this.setState({
                    student_point_average: data
                })
            })
        }
    }

    render() { 
        const { id, first_name, last_name, addToClass, handleClick, remove, handleRemoveFromClass } = this.props
        return (  
            <div>
            {first_name}, {last_name}: {this.state.student_point_average}
            {addToClass ? 
            <div>
                {/* <button onClick={() => handleClick(id)}>Add To Class</button>  */}
                <Button color={this.props.menu ? 'purple' : null} onClick={() => handleClick(id)}>Add Student To Class</Button>
            </div>
            : 
            null
            }
            {remove ? 
            <div>
                {/* <button onClick={() => handleRemoveFromClass(id)}>Remove From Class</button> */}
                <Button color={this.props.menu ? 'purple' : null} onClick={() => handleRemoveFromClass(id)}>Remove From Class</Button>
            </div> 
            : 
            null
            }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.app.menu
})

export default connect(mapStateToProps)(Student);