import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import Header from "./components/Header";
import axios from 'axios';
import Footer from "./components/Footer";
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import style from "./styles/style.css"


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'authors': [],
            'users': [],
            'projects': [],
            'todoes': []
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
        axios.get('http://localhost:8000/api/project')
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects,
                })
            })
        axios.get('http://localhost:8000/api/to_do')
            .then(response => {
                const todoes = response.data.results
                this.setState({
                    'todoes': todoes,
                })
            })

    }


    render() {
        return (
            <body class="container">
            <div>

                <BrowserRouter>
                    <div class="header-center">
                        <Header/>
                    </div>
                    <div class={"table-center"}>
                        <Routes>
                            <Route path='/' element={<UserList users={this.state.users}/>}/>
                            <Route path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path='to_do' element={<ToDoList todoes={this.state.todoes}/>}/>
                        </Routes>
                    </div>

                    <div class='elem-center'>
                        <Footer/>
                    </div>

                </BrowserRouter>
            </div>
            </body>)
    }

}

export default App;
