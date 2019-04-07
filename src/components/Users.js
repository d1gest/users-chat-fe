import React, {Component} from 'react';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            size: 2,
            page: 0,
            data: []
        };
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);

    }

    componentDidMount() {
        this.fetchData(this.state.page, this.state.size);
    }

    fetchData(page, size) {
        console.log("PAGE " + page);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
        });
        const options = {
            url: `http://localhost:8082/api/user/?page=${page}&size=${size}`,
            method: "GET",
            headers: headers
        };
        fetch(options.url, options)
            .then(response => response.json()
                .then(json => {
                    console.log(json);
                    this.setState({data: json.content});
                }));
    }

    handleNext() {
        const newPage = this.state.page + 1;
        this.setState({page: newPage});
        this.fetchData(newPage, this.state.size);
    }

    handlePrev() {
        const newPage = this.state.page - 1;
        this.setState({page: newPage});
        this.fetchData(newPage, this.state.size);
    }

    handleSizeChange(e) {
        this.setState({
            size: e.target.value,
            page: 0
        });
        this.fetchData(0, e.target.value);
    }

    render() {
        return (
            <div>
                {this.state.data.map(item =>
                    <div key={item.id}>
                        <span>{item.id}</span>
                        <span>{item.name}</span>
                        <span>{item.username}</span>
                        <span>{item.email}</span>
                    </div>
                )}
                <button onClick={this.handlePrev}>Prev</button>
                <button onClick={this.handleNext}>Next</button>
                <input onChange={this.handleSizeChange}/>
            </div>

        );
    }
}

export default Users;