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
  	console.log(this.props.message.userColour, "colour should be here")
  	switch(this.props.message.type) {
  	  case "incomingMessage":
  	  	return (
  	    <div className="message" key={this.props.message.uuid}>
  	      <span className="username" style={{color: `#${this.props.message.userColour}`}}>
  	      	{this.usernameExists(this.props.message.username)}
  	      </span>
  	      <span className="content">{this.props.message.content}</span>
  	    </div>
  	    )
  	    break;
  	  case "incomingNotification":
  	  	return (
  	    <div className="message system">
  	    	<span className="username">{this.usernameExists(this.props.message.username)}</span>
	  	    <span className="content">{this.props.message.content}</span>
  	    </div>
  	    )
  	    break;
  	}
	}
}
export default Message;




