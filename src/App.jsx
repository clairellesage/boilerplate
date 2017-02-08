import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
//set the initial state
  constructor(props) {
    super(props);
    this.state = {currentUser : "", messages: []};
  }

  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }

  updateUsername(newName) {
    this.setState({currentUser: newName});
    console.log(newName);
  }

  addMessage(newMessage) {
    const message = { content: newMessage, id: this.state.messages.length + 1, username: this.state.currentUser};
    
    this.setState({messages: this.state.messages.concat(message)});
    console.log("state.messages: ", this.state.messages);
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