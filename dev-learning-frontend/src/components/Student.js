import React from 'react';

const Student = ({ id, first_name, last_name, point_average, handleClick }) => {
    return (  
        <div>
            {first_name}, {last_name}: {point_average} 
            <button onClick={() => handleClick(id)}>Add To Class</button>
        </div>
    );
}

export default Student;