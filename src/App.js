import React, {Component} from 'react';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Landing from "./components/Landing";
import UserList from "./components/UserList";
import Chat from "./components/Chat";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/users" component={UserList}/>
                    <Route exact path="/chat" component={Chat}/>
                </div>
            </Router>
        );
    }
}

export default App;