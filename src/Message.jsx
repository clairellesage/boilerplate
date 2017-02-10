import React, {Component} from 'react';

class Message extends Component {
	usernameExists(username) {
		if (this.props.message.username === ""){
			return "Anonymous";
		} else {
			return this.props.message.username;
		}
	}
	getStyles(userColour) {
		console.log(userColour);
    return {color: userColour}
	}
  render() {
  	console.log(this.getStyles(this.props.message.userColour))
  	switch(this.props.message.type) {
  	  case "incomingMessage":
  	  	return (
  	    <div className="message" key={this.props.message.uuid}>
  	      <div className="username" style={this.getStyles(this.props.message.userColour)}>
  	      	{this.usernameExists(this.props.message.username)}
  	      </div>
  	      <div className="content">{this.props.message.content}</div>
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




