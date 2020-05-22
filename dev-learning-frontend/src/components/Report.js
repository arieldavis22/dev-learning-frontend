import React from 'react';

const Report = ({ id, title, message, handleRemoveLesson }) => {
    return (  
        <div>
            {title}:<br />
            {message}
            <button onClick={() => handleRemoveLesson(id)}>Remove Lesson</button>
        </div>
    );
}

export default Report;