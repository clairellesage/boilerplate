import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
  	console.log("Rendering <MessageList/>")
    console.log(this.props.messages)
    return (
     <div id="message-list">
     	{
        this.props.messages.map(function(message) {
     		  return (
     		    <Message key={message.uuid} 
                     message={message.content}
                     user={message.username}
            />
     		  );
     	  })
     	}
     </div>
    );
  }
}
export default MessageList;