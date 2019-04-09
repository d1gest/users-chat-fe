import React, {Component} from "react";
import UserList from "./UserList";
import MessageList from "./MessageList";
import SockJS from "sockjs-client";
import {Stomp} from '@stomp/stompjs';
import SendMessage from "./SendMessage";

class Chat extends Component {

    constructor() {
        super();
        this.socket = new SockJS('http://localhost:8082/ws');
        this.stompClient = Stomp.over(this.socket);
        this.state = {
            messages: []
        };


        this.onConnected = this.onConnected.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }

    componentDidMount() {
        this.stompClient.connect({}, this.onConnected, this.onError);
        console.log("Did mount " + this.stompClient);

    }

    onConnected() {
        // Subscribe to the Public Topic
        this.stompClient.subscribe('/topic/public', this.onMessageReceived);

        // Tell your username to the server
        this.stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: "TEST join", type: 'JOIN'})
        );

    }

    onError(error) {

    }

    sendMessage(message) {
        let chatMessage = {
            sender: localStorage.getItem("USERNAME"),
            content: message,
            type: 'CHAT'
        };

        this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }

    onMessageReceived(payload) {
        let message = JSON.parse(payload.body);
        this.setState({messages: [...this.state.messages, message]});
    }

    render() {
        return (
            <div className="chat-container">
                <UserList/>
                <MessageList messages={this.state.messages}/>
                <SendMessage sendMessage={this.sendMessage}/>
            </div>

        );
    }
}

export default Chat;