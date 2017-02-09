import React, {Component} from 'react';

class Message extends Component {
	usernameExists(username) {
		if (this.props.message.username === ""){
			return "Anonymous";
		} else {
			return this.props.message.username;
		}
	}
  render() {
  	switch(this.props.message.type) {
  	  case "incomingMessage":
  	  	return (
  	    <div class="message">
  	      <span class="username">{this.usernameExists(this.props.message.username)}</span>
  	      <span class="content">{this.props.message.content}</span>
  	    </div>
  	    )
  	    break;
  	  case "incomingNotification":
  	  	return (
  	    <div class="message system">
  	    	<span class="username">{this.usernameExists(this.props.message.username)}</span>
	  	    <span class="content">{this.props.message.content}</span>
  	    </div>
  	    )
  	    break;
  	}
	}
}
export default Message;




