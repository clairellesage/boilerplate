import React, {Component} from 'react';



class Message extends Component {
	usernameExists(username) {
		if (!this.props.user){
			return "Anonymous";
		} else {
			return this.props.user;
		}
	}
  render() {
  	console.log("Rendering <Message/>")
    return (
	     <div class="message">
	      <span class="username">{this.usernameExists(this.props.user)}</span>
	      <span class="content">{this.props.message}</span>
	    </div>
    );
  }
}
export default Message;

		