import React from 'react';
import {render , screen} from '@testing-library/react';
import {TodoProvider} from '../../State/context';
import {Todo} from '../todo/todo';

decribe('Todo component', () =>{
    test("When a task title is typed into the input box and the 'add' button is clicked, a new todo item is added to the list", () => {
        render(<TodoProvider><Todo /></TodoProvider>);
        const inputEl = screen.getByPlaceholderText("Enter Task");
        console.log(inputEl);
    });
});