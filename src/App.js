import './App.css';
import React, {useState, useEffect} from 'react';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import MessageComp from './MessageComp';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import FacebookIcon from '@material-ui/icons/Facebook';
import {IconButton} from '@material-ui/core';


function App() {

  //useState is for setting variable value
  const [inputMsg, setInputMsg] = useState('');
  const [allMessages, setAllMessages] = useState([]); 
  const [user, setUser] = useState('');

  //useEffect = run code on a condition
  useEffect(() => {
    const name = prompt('Please Enter your name:');
    setUser(name);
  }, [])

  useEffect(() => {
    //run this when app component loads
    db.collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setAllMessages(snapshot.docs.map(doc => ({id: doc.id, msgg: doc.data()}))) //in firebase: collection > document > collection
      //console.log(snapshot.docs.map(doc => ({id: doc.id, msgg: doc.data()})))
    });
  }, [])

  const sendMsg = (event) => {
    event.preventDefault();
    //push message to db
    db.collection('messages').add({
      message: inputMsg,
      username: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    //setAllMessages([...allMessages, {username: user, message: inputMsg}]);
    setInputMsg(''); //clear msg
  }

  //console.log(user)
  //console.log(inputMsg);
  //console.log(allMessages);

  return (
    <div className="App">
      <h1><FacebookIcon/></h1>
      <div className = "header">
        <h1>Messanger Clone</h1>
      </div>
      <br/>
      <form className = "app__form">
        <FormControl className = "app__fromControl">
          {/**Input field */}
         
          <Input value = {inputMsg} onChange = {e => setInputMsg(e.target.value)} placeholder = "Enter message..." className = "app__input"/>
          {/**Button to send input*/}
          <IconButton variant = "contained" color = "primary" type = "submit" disabled = {!inputMsg}  onClick = {sendMsg} className = "app__icon_button"><SendIcon/></IconButton>
        </FormControl>
      </form>

      {/**Show all convo messages */}
      <FlipMove>
        {
          allMessages.map(({id, msgg}) => (
            <MessageComp key = {id} usernameProp = {user} allMessagesObj = {msgg}/> /**Key helps to show messages in order and renders only new message not everything*/
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
