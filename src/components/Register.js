import React, {Component} from "react";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            username: "",
            email: "",
            password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const options = {
            url: "http://localhost:8082/api/auth/signup",
            method: "POST",
            headers: headers,
            body: JSON.stringify(newUser)
        };
        fetch(options.url, options)
            .then(response => response.json()
                .then(json => {
                    console.log(json);
                }));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <p>Create your Account</p>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <input type="submit" className="btn btn-info btn-block mt-4"/>
                </form>
            </div>
        );
    }
}

export default Register;