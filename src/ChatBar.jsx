import React, {Component} from 'react';

class ChatBar extends Component {
	
	_handleUsernameChange(e) {
		if (e.key === 'Enter') {
			this.props.onUsernameChange(e.target.value);
		}
	}


	_handleMessageKeyPress(e) {
		if (e.key === 'Enter') {
			this.props.onNewMessage(e.target.value);
		}
	}

  render() {
  	console.log("Rendering <ChatBar/>")
    return (
      <footer>
        <input 
	        id="username" 
	        type="text" 
	        placeholder="Your Name (Optional)" 
	        defaultValue={this.props.currentUser}
	        onKeyPress={(e) => this._handleUsernameChange(e)}
	       />
        <input 
        	id="new-message" 
        	type="text" 
        	placeholder="Type a message and hit ENTER"
        	onKeyUp={(e) => this._handleMessageKeyPress(e)}
        />
      </footer>
    );
  }	
}
export default ChatBar;