import React from 'react';
import './chat.css';
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
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import {useInterval} from '../../hooks/use-interval'
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';


export const Chat = () => {
    return(
        <div>
          <Header></Header>
          <ChatGrid></ChatGrid>
        </div>
    );
}

const Header = () =>{
  return(
    <Typography sx={{align: 'right',margin: '2.5%', color: '#ff3d00', fontWeight: 'bolder', fontSize: '2.5em', fontFamily: 'BlinkMacSystemFont'}}>
        My Chat Room
    </Typography>
  );
}
 

  const Item = styled(Paper)(({ theme }) => ({
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
    const[newUser, setNewUser] = React.useState('');

    useInterval(
        () => {
          fetch(
            `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`
          )
          .then((response) => response.json())
          .then((data) => {
              setChatList(data.Items);
          });
        },
        1000
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
      <Box sx={{  marginRight: 30, marginLeft: 30}}>
        <Grid container spacing={1} sx={{height: '100vh'}}>
          <Grid item xs width="10%" >
                <Item sx={{ m: 1 }}>
                    <InputUser
                        setNewUser={setNewUser}
                    ></InputUser>
                </Item>
                <Item sx={{ m: 1}}>
                    <InputText
                        chatList={chatList}
                        setChatList={setChatList}
                    ></InputText>
                </Item>
                <Item sx={{ m: 1, height: '76vh', overflow: 'scroll',  overflowX: "hidden",   
                            "&::-webkit-scrollbar-track": {
                            backgroundColor: "white"
                            },
                            "&::-webkit-scrollbar": {
                              width: "8px"
                            },
                            "&::-webkit-scrollbar-thumb": {
                            backgroundColor: 'gray',
                            borderRadius: 1
                            }}}>
                    <ChatRows
                        chatList={chatList}
                        setChatList={setChatList}
                        currChat = {currChat}
                        setCurrChat = {setCurrChat}>
                    </ChatRows>
                </Item>
          </Grid>
          <Grid xs={9} >
            <div className='chatHeader'>
              <Typography sx={{textAlign: 'center', fontSize: '2em', color: 'GrayText', padding:'1%'}}>{currChat.name}</Typography>
            </div>
            <Item 
                sx={{ height: '78vh', overflowY: 'scroll', overFlowX:'hidden',
                      "&::-webkit-scrollbar-track": {
                      backgroundColor: "white"
                      },
                      "&::-webkit-scrollbar": {
                        width: "8px"
                      },
                      "&::-webkit-scrollbar-thumb": {
                      backgroundColor: 'gray' /*"rgb(25, 118, 210)"*/,
                      borderRadius: 1
                      }}}>          

                <MessageBox 
                    messages={messages}
                    newUser = {newUser}
                ></MessageBox> 
                </Item>
                <Item>
                <EnterMessage 
                    messages={messages}
                    setMessages={setMessages}
                    currChat = {currChat}
                    newUser = {newUser}
                ></EnterMessage>
            </Item>
          </Grid>
        </Grid>
      </Box>
    );
  }

  function InputUser(props){
    function handleChange(event){
        props.setNewUser(event.target.value)
    }

    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { marginBottom: 1, marginLeft: 1},
          bgcolor: blue,
          display: 'flex', 
          alignItems: 'flex-start'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="standard-basic" label="User Name" variant="standard" onChange={handleChange}/>
        <Button></Button>
      </Box>
    );
  }

  function ChatRows(props) {
    return (
      <List > 
        {props.chatList.map((chat) => (
            <ListItem key={chat.id} component="div" disablePadding>
                <ListItemButton onClick={() => props.setCurrChat(chat)}>
                    <AccountCircle className = "profile" sx={{  mr: 1, my: 0.5 }} />   
                    <ListItemText  primary={chat.name} />
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
          '& > :not(style)': {marginBottom: 1, marginLeft: 1},
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
        username: props.newUser, 
        text: message 
      }
      fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
        },
        body: JSON.stringify(newMessage),
      }).then((response) => response.json());
    }
    return (
      <Box 
        sx={{
          maxWidth: '95%',
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
    const reversedItems = props.messages.map(item => item).reverse();
        return(
            <List >
                {reversedItems.map((message) =>(
                    <ListItem className ="listItem" key={message.id} >
                      <div className="chat">
                      <span className = {message.username === props.newUser ? "myInitial": "otherInitial"}>
                        {message.username == null ?"A": message.username.charAt(0).toUpperCase()}
                      </span>
                      <span className={message.username === props.newUser? "myMessages": "otherMessages"}>
                        {message.text}
                      </span>
                      </div>
                    </ListItem>
                ))}
            </List>
        );
  };
