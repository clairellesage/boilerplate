const ws = new WebSocket('ws://localhost:4000');

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
    let self = this
    ws.onmessage = function (message) {
      self.setState({messages: self.state.messages.concat(JSON.parse(message.data))})
    } 
    ws.onopen = function (event) {
      console.log("Connected to Server"); 
    };
  }

  updateUsername(newName) {
    this.setState({currentUser: newName});
    console.log(newName);
  }

  addMessage(newMessage) {
    const message = { content: newMessage, id: this.state.messages.length + 1, username: this.state.currentUser};
    // console.log("state.messages: ", this.state.messages);
    // ws.send(JSON.stringify(this.state.currentUser));
    // this.setState({messages: this.state.messages.concat(message)})
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