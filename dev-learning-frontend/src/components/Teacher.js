import React from 'react';

const Teacher = ({ first_name, last_name }) => {
    return (  
        <div>
            <h3>{first_name}, {last_name}</h3> 
            <button>Follow</button>
        </div>
    );
}

export default Teacher;