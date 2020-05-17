import React from 'react';

const Lesson = ({ id, title, edit, handleClickLesson }) => {
    return (  
        <div>
            <h1>{title}</h1>
            {edit ? <button onClick={() => handleClickLesson(id)}>Add To Class</button> : null}
        </div>
    );
}

export default Lesson;