import './todo.css';
import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';

export const Todo = () =>{
    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 8,
        width: '50%',
        margin: 'auto',
      };

    return (
            <Box sx={{ ...commonStyles, borderColor: 'primary.main', justifyContent: 'center', borderRadius: '16px'}} >
                <Typography sx={{color: '#ff3d00', fontWeight: 'bolder', fontSize: '5rem', fontFamily: 'BlinkMacSystemFont'}}>Todo</Typography>
                <TodoItems></TodoItems>
            </Box>
    )   
}

const initialList = [];

const TodoItems = () =>{
    const[list, setList] = useState(initialList);
    const[task, setTask] = useState('');
    const[countID, setCountID] = useState(0);
    
    function handleChange(event){
        setTask(event.target.value)
    }
    function addTask(){
        incrementID();
        const newList = list.concat({name: task, id: countID, isComplete: false});
        setList(newList);
    }

    function incrementID(){
      setCountID(countID + 1);
    }

    return(
        <div>
            <AddItem
                task={task}
                onChange={handleChange}
                onAdd={addTask}
            />

            <Tasks list={list}
                   setList={setList} />
        </div>
    )
}

const AddItem = ({task, onChange, onAdd}) => (
    <div>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="standard-basic" label="Enter Task" variant="standard" onChange={onChange} />
        </Box>
        <Button onClick={onAdd} variant="outlined" startIcon={<AddIcon />}>
            Add Task
        </Button>
    </div>
);

const Tasks = ({list,setList}) => {
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

  const deleteTask = (value) => () =>{
    const tempList = [...list];
    const index = tempList.findIndex(taskTodo => taskTodo.id === value.id);
    console.log(index);
    tempList.splice(index,1);
    setList(tempList);
  };

    return(
    <div>
        <List>
            {list.map((item) => (
                <ListItem className={item.isComplete ? "completed":"onList"} key={item.currentIndex} primary={item.task}>
                <Checkbox
                    size='small'
                    edge = "end"
                    onChange={handleToggle(item)}
                    checked={checked.indexOf(item) !== -1}
                 ></Checkbox>
                 
                <IconButton  aria-label="delete" onClick={deleteTask(item)}>
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

/*
const Tasks = ({list}) => {
    const [checked, setChecked] = React.useState([1]);
    const [style, setStyle] = useState("cont");

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        
        setChecked(newChecked);

    };


    return(
    <div>
        <List>
            {list.map((item) => (
                
                <ListItem className={style} primary={item.task}>{item.task}
                <Checkbox
                    edge = "end"
                    onChange={handleToggle(item)}
                    checked={checked.indexOf(item) !== -1}
                    className="iconButton"
                 ></Checkbox>
                 
                 <IconButton className="iconButton" edge="end" aria-label="delete">
                 <DeleteOutlineOutlinedIcon />
                </IconButton>
                
                 
                </ListItem>
            ))}
        </List>
    </div>
    );
}
*/