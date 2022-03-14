import React, {useState} from 'react';
import './chat.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import {useInterval} from '../../hooks/use-interval'




export const Chat = () => {
    return(
        <ChatGrid></ChatGrid>
    );

}
 
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '95%',
  }));

  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary,

  }));

  const ChatGrid = () => {
    const[chatList, setChatList] = React.useState([]); 
    const[messages, setMessages] = React.useState([]);
    const[currChat, setCurrChat] = React.useState({});

    useInterval(
        () => {
          //const chatId = params[0];
          fetch(
            `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`
          )
          .then((response) => response.json())
          .then((data) => {
              setChatList(data.Items);
          });
        },
        1000, // fast polling
        //60000, // slow polling
        //currChat.id
    );   
    useInterval(
      (params) => {
        const chatId = params[0];
        fetch(
          `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${chatId}/messages`
        )
          .then((response) => response.json())
          .then((data) => {
            setMessages(data.Items);
          });
      },
      1000, // fast polling
      //60000, // slow polling
      currChat.id
    );

    return (
      <Box sx={{ flexGrow: 1, margin: 5}}>
        <Grid container spacing={1} sx={{height: '100vh'}}>
          <Grid item xs >
                <Item2 sx={{ m: 1 }}>
                    <InputText
                        chatList={chatList}
                        setChatList={setChatList}
                    ></InputText>
                </Item2>
                <Item2 sx={{ m: 1, height: '85vh', overflow: 'scroll'}}>
                    <ChatRows
                        chatList={chatList}
                        setChatList={setChatList}
                        currChat = {currChat}
                        setCurrChat = {setCurrChat}>
                    </ChatRows>
                </Item2>
          </Grid>
          <Grid xs={9}  sx={{ alignItems: 'baseline' }} id = "messages" >
            <Item sx={{ m: 1, height: '96vh', overflow: 'scroll', alignItems: 'baseline'}}>
                <EnterMessage
                    messages={messages}
                    setMessages={setMessages}
                    currChat = {currChat}
                ></EnterMessage>
                <MessageBox
                    messages={messages}
                ></MessageBox>
            </Item>
          </Grid>
        </Grid>
      </Box>
    );
  }

  function ChatRows(props) {
    return (
      <List> 
        {props.chatList.map((chat) => (
            <ListItem key={chat.id} component="div" disablePadding>
                <ListItemButton onClick={() => props.setCurrChat(chat)}>
                    <AccountCircle className = "profile" sx={{color: "black", mr: 1, my: 0.5 }} />   
                    <ListItemText primary={chat.name} />
                </ListItemButton>
            </ListItem>
        ))} 

      </List> 
    );
  }
  


function InputText(props) {
    const[newChat, setNewChat] = React.useState('');

    function handleChange(event){
        setNewChat(event.target.value)
    }

    function addChat(){
      const chat = {
        name: newChat
      };
      
      fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
          },
          body: JSON.stringify(chat),
       }).then((response) => response.json());
   }

    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1},
          bgcolor: blue,
          display: 'flex', 
          alignItems: 'flex-end'
        }}
        noValidate
        autoComplete="off"
        
      >
        <TextField id="standard-basic" label="Add Chat" variant="standard" onChange={handleChange}/>
        <Button onClick={addChat} startIcon={<AddIcon />}></Button>
      </Box>
    );
  }

  function EnterMessage(props) {
    const[message, setMessage] = React.useState('') ;
    const handleChange = (event) => {
        setMessage(event.target.value);
    }
    const addMessage = () => {
      const newMessage = {
        chatId: props.currChat.id, 
        username: 'worker', 
        text: message 
      }
      fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
        },
        body: JSON.stringify(newMessage),
      }).then((response) => response.json())
        .then((data) => console.log(data));
      //const newMessages = [...props.messages, {text: message}];
      //props.setMessages(newMessages);
    }
    return (
      <Box 
        sx={{
          maxWidth: '100%',
        }}
      >
        <FormControl fullWidth sx={{ m: 1}} variant="outlined" id="fullWidth">
          <InputLabel>Message</InputLabel>
          <OutlinedInput 
            onChange={handleChange}
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton 
                    edge="end" 
                    onClick={addMessage}>
                    <SendIcon sx={{color: 'primary.main'}}/>
                </IconButton>
              </InputAdornment>
            }
            label="Message"
          />
        </FormControl>  
      </Box>
      
    );
  }  


  function MessageBox(props){
        return(
            <List>
                {props.messages.map((message) =>(
                    <ListItem key={message.id} ><span className="initial">{message.username.charAt(0).toUpperCase()}</span><span className="message">{message.text}</span></ListItem>
                ))}
            </List>
        );
  };
