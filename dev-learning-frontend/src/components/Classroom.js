import React from 'react';

const Classroom = ({ id, name}) => {
    return (  
        <div>
            <h3>{name}</h3>
            <button>Edit Classroom/Add Student</button>
        </div>
    );
}

export default Classroom;