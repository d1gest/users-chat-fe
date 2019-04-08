import React, {Component} from "react";
import Message from "./Message";

class MessageList extends Component {

    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={index} sender={message.sender} content={message.content}/>
                    )
                })}
            </div>
        )
    }
}

export default MessageList;