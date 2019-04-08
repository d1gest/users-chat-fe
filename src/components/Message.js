import React from "react";

function Message(props) {
    return (
        <div className="message">
            <div>{props.sender}</div>
            <div>{props.content}</div>
        </div>
    )
}

export default Message;