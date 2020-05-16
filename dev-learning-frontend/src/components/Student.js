import React from 'react';

const Student = ({ first_name, last_name, point_average, classroom, handleOnClick }) => {
    return (  
        <div>
            {first_name}, {last_name}: {point_average} 
            {classroom ? null : <button onClick={handleOnClick}>Add To Class</button>}
        </div>
    );
}

export default Student;