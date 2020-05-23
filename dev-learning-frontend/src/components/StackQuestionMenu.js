import React, { Component } from 'react';
import { Form, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Virtuoso } from 'react-virtuoso'

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
        fetch("http://localhost:3000/search-stack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(data => this.props.setStackAnswers(data))
    }

    renderMenuItems = () => {
        if(this.props.stackAnswers.items) {
            return <Virtuoso
            style={{ width: '200px', height: '500px' }} 
            totalCount={1} 
            item={() => <div>
                {this.props.stackAnswers.items.map(answer => {
                return <div key={answer.question_id}>
                    <h3>{answer.title}</h3>
                    <p>{answer.link}</p>
                </div>
            })}
            </div>} />
        }
    }
    render() { 
        return (  
            <Menu vertical position='right' fixed='right'>
                <Menu.Item positon='right'>
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
})

const mapDispatchToProps = dispatch => ({
    setStackAnswers: answers => dispatch({type: "SET_STACK_ANSWERS", answers})
})
export default connect(mapStateToProps, mapDispatchToProps)(StackQuestionMenu);