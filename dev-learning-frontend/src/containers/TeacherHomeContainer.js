import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';



class TeacherHomeContainer extends Component {
    render() { 
        return (  
            <div>
                <NavLink to="/classroom" exact>
                    <Button color={this.props.menu ? 'purple' : null} icon='book' size='massive' content='Classrooms'/>
                </NavLink><br />
                <br/>
                <NavLink to="/lessons" exact>
                    <Button color={this.props.menu ? 'purple' : null} icon='file' size='massive' content='Lessons'/>
                </NavLink><br />
                <br/>
                <NavLink to="/teacher-follow" exact>
                    <Button color={this.props.menu ? 'purple' : null} icon='user' size='massive' content='See Following'/>
                </NavLink>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.app.menu
})

export default connect(mapStateToProps)(TeacherHomeContainer);