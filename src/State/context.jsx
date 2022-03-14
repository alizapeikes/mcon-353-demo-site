import React, { useState } from 'react';

export const TodoContext = React.createContext();

export const TodoProvider = (props) => {
    const[list, setList] = useState([]);
    return(
        <TodoContext.Provider value={{list, setList}}>
            {props.children}    
        </TodoContext.Provider>
    )
}