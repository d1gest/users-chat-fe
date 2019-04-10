import React, {Component} from "react";
import Message from "./Message";

class MessageList extends Component {

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={index} sender={message.sender} content={message.content}/>
                    )
                })}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}

export default MessageList;