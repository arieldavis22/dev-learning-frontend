import React from 'react';

const Student = ({ id, first_name, last_name, point_average, addToClass, handleClick }) => {
    return (  
        <div>
            {first_name}, {last_name}: {point_average} 
            {addToClass ? <button onClick={() => handleClick(id)}>Add To Class</button> : null}
        </div>
    );
}

export default Student;