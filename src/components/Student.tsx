import React, { useState, useEffect } from 'react';
import { findStudentGPA } from '../services/users'
import { Button } from 'semantic-ui-react'
import { useSelector } from 'react-redux';

const Student = (props) => {
    const [pointAverage, setPointAverage] = useState('')
    const { id, first_name, last_name, addToClass, handleClick, remove, handleRemoveFromClass 
    } = props
    const menu = useSelector(state => state.app.menu)

    useEffect(() => {
        if(props.classroom_id) {
            findStudentGPA(props.classroom_id, props.id)
            .then(data => setPointAverage(data))
        }
    })
    return (  
        <div>
            {first_name}, {last_name}: {pointAverage}
            {addToClass ? 
            <div>
                <Button 
                color={menu ? 'purple' : null} 
                onClick={() => handleClick(id)}>
                    Add Student To Class
                </Button>
            </div>
            : null}

            {remove ? 
            <div>
                <Button 
                color={menu ? 'purple' : null} 
                onClick={() => handleRemoveFromClass(id)}>
                    Remove From Class
                </Button>
            </div> 
            : null}

            </div>
    );
}

export default Student;
