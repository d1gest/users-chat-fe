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
        var headers = {};
        headers['Authorization'] = 'Bearer ' + localStorage.getItem("ACCESS_TOKEN");
/*        const headers = new StompHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
        });*/
        this.stompClient.connect(headers, this.onConnected, this.onError);
    }

    onConnected() {
        // Subscribe to the Public Topic
        //this.stompClient.subscribe('/chat', this.onMessageReceived);
        this.stompClient.subscribe('/user/chat', this.onMessageReceived);

        // Tell your username to the server
        this.stompClient.send("/chat.addUser",
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

        //this.stompClient.send("/chat.sendMessage", {}, JSON.stringify(chatMessage));
        this.stompClient.send("/chat.sendPrivateMessage", {}, JSON.stringify(chatMessage));

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