import './todo.css';
import React, {useState, useContext} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import {TodoContext} from  '../../State/context';



export const Todo = () => {
    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 8,
        width: '50%',
        margin: 'auto',
      };

    return (
            <Box sx={{ ...commonStyles, borderColor: 'primary.main', justifyContent: 'center', borderRadius: '16px', marginTop: '3em'}} >
                <Typography sx={{color: '#ff3d00', fontWeight: 'bolder', fontSize: '5rem', fontFamily: 'BlinkMacSystemFont'}}>Todo</Typography>
                <TodoItems></TodoItems>
            </Box>  
    )   
}

const TodoItems = () =>{

    const {list, setList} = useContext(TodoContext);
    const[task, setTask] = useState('');
    const[countID, setCountID] = useState(0);
    
    function handleChange(event){
        setTask(event.target.value)
    }
    function addTask(){
        //use contest instead of useState
        incrementID();
        const newTodos = [...list, {name: task, id: countID, isComplete: false}]
        setList(newTodos);
    }

    function incrementID(){
      setCountID(countID + 1);
    }

    return(
        <div>
            <InputItem 
                onChange={handleChange}
                onAdd={addTask}
            />
            <TaskList />
        </div>
    )
}

const InputItem = ({onChange, onAdd}) => (
    <div>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="standard-basic" label="Enter Task" variant="standard" onChange={onChange} placeholder = "Enter Task"/>
        </Box>
        <Button onClick={onAdd} variant="outlined" startIcon={<AddIcon />}>
            Add Task
        </Button>
    </div>
);

const TaskList = () => {
  const {list, setList} = useContext(TodoContext);  
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        
        setChecked(newChecked);
        if(value.isComplete){
          value.isComplete = false;
        }else{
          value.isComplete = true;
        }

    };

  const deleteTask = (value) =>{
      const tempList = [...list];
      const index = tempList.findIndex(taskTodo => taskTodo.id === value.id);
      tempList.splice(index,1);
      setList(tempList);
  };

    return(
    <div>
        <List>
            {list.map((item) => (
                <ListItem className={item.isComplete ? "completed":"onList"} key={item.id} primary={item.task}>
                <Checkbox
                    size='small'
                    onChange={handleToggle(item)}
                 ></Checkbox>
                 
                <IconButton  aria-label="delete" onClick={() => deleteTask(item)}>
                  <DeleteOutlineOutlinedIcon/>
                </IconButton>
                <Typography className={item.isComplete ? "completed":"onList"}>
                  {item.name}
                </Typography>  
                
                </ListItem>
            ))}
        </List>
    </div>
    );
}
