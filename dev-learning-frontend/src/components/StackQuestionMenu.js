import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react'

class StackQuestionMenu extends Component {
    render() { 
        return (  
            <Menu vertical position='right' fixed='right'>
                <Menu.Item positon='right'>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
            </Menu>
        );
    }
}

export default StackQuestionMenu;