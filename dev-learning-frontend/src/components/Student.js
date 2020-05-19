import React from 'react';

const Student = ({ id, first_name, last_name, point_average, addToClass, handleClick, remove, handleRemoveFromClass }) => {
    return (  
        <div>
            {first_name}, {last_name}: {point_average} 
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

export default Student;