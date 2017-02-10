const ws = new WebSocket('ws://localhost:4000');
const uuid = require('node-uuid');

import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

function randColour() {
  const colours = ["green", "‎pink","‎red", "blue"];
  const colourPick = Math.floor(Math.random() * 4)
  return colours[colourPick];
}

class App extends Component {
//set the initial state
  constructor(props) {
    super(props);
    this.state = {usersConnected: 0, userColour: randColour(), currentUser : "", messages: []};
  }

   componentDidMount() {
    ws.onopen = (event) => {
      console.log("User connected!")
    };

    ws.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      console.log(data.type);
      switch(data.type) {
        case "incomingMessage":
          // handle incoming message
          this.setState({messages: this.state.messages.concat(JSON.parse(event.data))});
          break;
        case "incomingNotification":
          // handle incoming notification
          // self.setState({messages: self.state.messages.concat(JSON.parse(event.data))})
          this.setState({messages: this.state.messages.concat(JSON.parse(event.data))});
          break;
        case "userConnected":
          this.setState({usersConnected: data.numUsers});
          break;
        // case "colours":
        //   this.setState({userColours: data.userColour});
        //   console.log(data.userColour, "colour is here");
        //   break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  updateUsername(newName) {
    if (this.state.currentUser === "") {
      return this.setState({currentUser: "Anonymous"})
    }
    this.setState({currentUser: newName});
    const nameChange = { type: "postNotification", content: `${this.state.currentUser} has changed their name to ${newName}`}
    ws.send(JSON.stringify(nameChange))
  }

  addMessage(newMessage) {
    const message = { type: "postMessage", content: newMessage, uuid: 0, username: this.state.currentUser, userColour: this.state.userColour};
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
          <p>
            {this.state.usersConnected} users connected
          </p>
          <h1>Chat-T</h1>
        </nav>
        <MessageList 
          messages={this.state.messages}
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