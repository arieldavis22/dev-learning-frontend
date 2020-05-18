import React from 'react';

const Teacher = ({ id, first_name, last_name, handleTeacherFollow, notFollowed }) => {
    return (  
        <div>
            <h3>{first_name}, {last_name}</h3> 
            {notFollowed ? <button onClick={() => handleTeacherFollow(id)}>Follow</button> : null }
        </div>
    );
}

export default Teacher;