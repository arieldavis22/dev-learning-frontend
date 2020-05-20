import React, { Component } from 'react';

class Student extends Component {

    state = {
        student_point_average: ''
    }

    componentDidMount() {
        if(this.props.classroom_id) {
            fetch("http://localhost:3000/find-student-gpa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    classroom_id: this.props.classroom_id,
                    student_id: this.props.id
                })
            })
            .then(r => r.json())
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
                <button onClick={() => handleClick(id)}>Add To Class</button> 
            </div>
            : 
            null
            }
            {remove ? 
            <div>
                <button onClick={() => handleRemoveFromClass(id)}>Remove From Class</button>
            </div> 
            : 
            null
            }
            </div>
        );
    }
}

export default Student;