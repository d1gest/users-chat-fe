import React, {Component} from "react";
import UserList from "./UserList";
import MessageList from "./MessageList";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

class Chat extends Component {


    constructor() {
        super();
        this.socket = new SockJS('http://localhost:8082/ws');
        this.stompClient = Stomp.over(this.socket);
        console.log("Constructor " + this.stompClient);
        this.onConnected = this.onConnected.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }

    componentDidMount() {
        this.stompClient.connect({}, this.onConnected, this.onError);
        console.log("Did mount " + this.stompClient);

    }

    onConnected() {
        console.log("On connected " + this.stompClient);

        // Subscribe to the Public Topic
        this.stompClient.subscribe('/topic/public', this.onMessageReceived);

        // Tell your username to the server
        this.stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: "TEST", type: 'JOIN'})
        );

    }

    onError(error) {

    }


    sendMessage(event) {
        event.preventDefault();
        let chatMessage = {
            sender: "ASDAD",
            content: "ASDASD",
            type: 'CHAT'
        };

        this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));

    }


    onMessageReceived(payload) {
        let message = JSON.parse(payload.body);
        console.log(message);

    }

    render() {
        return (
            <div>
                <UserList/>
                <MessageList/>
                <button onClick={this.sendMessage}/>
            </div>

        );
    }
}

export default Chat;