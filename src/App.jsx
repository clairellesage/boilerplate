const ws = new WebSocket('ws://localhost:4000');
const uuid = require('node-uuid');

import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
//set the initial state
  constructor(props) {
    super(props);
    this.state = {currentUser : "", messages: []};
  }

   componentDidMount() {
    ws.onopen = function (event) {
      console.log("Connected to Server"); 
    };

    ws.onmessage = (event) => {
     
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const data = JSON.parse(event.data);
      console.log(data.type)
      // let self = this
      switch(data.type) {
        case "incomingMessage":
          // handle incoming message
          this.setState({messages: this.state.messages.concat(JSON.parse(event.data))})
          break;
        case "incomingNotification":
          // handle incoming notification
          // self.setState({messages: self.state.messages.concat(JSON.parse(event.data))})
          this.setState({messages: this.state.messages.concat(JSON.parse(event.data))})
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }

    // let self = this
    // ws.onmessage = function (message) {
    //   // self.setState({messages: self.state.messages.concat(JSON.parse(message.data))})
    // } 
    // ws.onmessage = function (nameChange) {
    //   // self.setState({currentUser: self.state.currentUser})
    // }
  }

  updateUsername(newName) {
    this.setState({currentUser: newName});
    const nameChange = { type: "postNotification", content: `${this.state.currentUser} has changed their name to ${newName}`}
    ws.send(JSON.stringify(nameChange))
  }

  addMessage(newMessage) {
    const message = { type: "postMessage", content: newMessage, uuid: 0, username: this.state.currentUser};
    ws.send(JSON.stringify(message))
  }

  addUserMessage(newName, newMessage) {
    this.setState({username: this.state.currentUser, messages: newMessage});
  }

  render() {
  	console.log("Rendering <App/>")
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList 
          // message={this.addUserMessage.bind(this)}
          componentDidMount={this.state.messages}
          messages={this.state.messages}
          currentUser={this.state.currentUser} 
        />
        <ChatBar 
          currentUser={this.state.currentUser}
          onUsernameChange={this.updateUsername.bind(this)}
          onNewMessage={this.addMessage.bind(this)} 
        />
    </div>
    );
  }
}
export default App;