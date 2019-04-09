import React, {Component} from "react";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            usernameOrEmail: "",
            password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const loginRequest = {
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password
        };

        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const options = {
            url: "http://localhost:8082/api/auth/signin",
            method: "POST",
            headers: headers,
            body: JSON.stringify(loginRequest)
        };
        fetch(options.url, options)
            .then(response => response.json()
                .then(json => {
                    console.log(json);
                    localStorage.setItem("ACCESS_TOKEN", json.accessToken);
                    localStorage.setItem("USERNAME", this.state.usernameOrEmail);
                }));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Email Address or username"
                        name="usernameOrEmail"
                        value={this.state.usernameOrEmail}
                        onChange={this.onChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default Login;