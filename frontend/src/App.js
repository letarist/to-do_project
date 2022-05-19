import logo from './logo.svg';
import './App.css';
import React from "react";
import AuthorList from "./components/Author";
import UserList from "./components/User";
import Header from "./components/Header";
import axios from 'axios';
import Footer from "./components/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'authors': [],
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/authors')
            .then(response => {
                const authors = response.data
                this.setState({
                    'authors': authors,
                })
            })
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users,
                })
            })
            .catch(error => console.log(error))
    }


    render() {
        return (
            <div>
                <Header/>
                <AuthorList authors={this.state.authors}/>
                <div>
                    <UserList users={this.state.users}/>
                </div>
                <Footer/>
            </div>)
    }
}


export default App;
