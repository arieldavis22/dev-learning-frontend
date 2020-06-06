import React, { Component } from 'react';
import { Form, Menu, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Virtuoso } from 'react-virtuoso'
import { searchStackAPI } from '../services/StackExchange'
import Toast from 'light-toast';

class StackQuestionMenu extends Component {

    state = {
        search: ''
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        Toast.loading('Loading')
        searchStackAPI(this.state)
        .then(data => {
            this.props.setStackAnswers(data)
            Toast.hide()
        })
    }

    renderMenuItems = () => {
        if(this.props.stackAnswers.items) {
            return <Virtuoso
            style={{ width: '200px', height: '500px' }} 
            totalCount={1} 
            item={() => <div>
                {this.props.stackAnswers.items.map(answer => {
                return <div className={this.props.menu ? 'search' : null} key={answer.question_id}>
                    <h3>{answer.title}</h3>
                    <a href={answer.link} target="_blank" rel="noopener noreferrer">Stack Post</a>
                    <Divider/>
                </div>
            })}
            </div>} />
        }
    }
    render() { 
        return (  
            <Menu inverted={this.props.menu} vertical position='right' fixed='right' >
                <Menu.Item positon='right' style={{width: "400px"}}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input icon='search' placeholder='Search...' onChange={this.handleChange} />
                    </Form>
                </Menu.Item>
                {this.renderMenuItems()}
            </Menu>
        );
    }
}
const mapStateToProps = state => ({
    stackAnswers: state.lesson.stackAnswers,
    menu: state.app.menu
})

const mapDispatchToProps = dispatch => ({
    setStackAnswers: answers => dispatch({type: "SET_STACK_ANSWERS", answers})
})
export default connect(mapStateToProps, mapDispatchToProps)(StackQuestionMenu);