import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import Header from "./components/Header";
import axios from 'axios';
import Footer from "./components/Footer";
import ProjectList from "./components/Project";
import OneProjectList from "./components/oneProject";
import ToDoList from "./components/ToDo";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginForm from "./components/Register"
import Logout from "./components/Logout"
import Cookies from "universal-cookie"
import style from "./styles/style.css"

// Люто игнорирую кастомный axios из-за наших споров:DDDDDDD

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todoes': [],
            'OneProject': [],
            'token': '',
        }
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.setToken('')
    }

    setToken(token) {
        const cookie = new Cookies()
        cookie.set('token', token)
        this.setState({'token': token}, () => this.loadData())
    }

    getTokenWithStorage() {
        const cookie = new Cookies()
        const token = cookie.get('token')
        this.setState({'token': token}, () => this.loadData())
    }

    get_token(username, password) {
        axios.post('http://localhost:8000/autorization/', {username: username, password: password})
            .then(response => {
                this.setToken(response.data.token)
                console.log(response.data.token)
            })
            .catch(error => alert('Ты все сломал('))

    }

    createHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token' + this.state.token
        }
        return headers
    }

    loadUser(url, headers) {
        axios.get(`${url}`, {headers})
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users,
                })
            })
            .catch(error => console.log(error))
    }

    loadProjects(url, headers) {
        axios.get(`${url}`, {headers})
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects,
                })
            })
            .catch(error => console.log(error))
    }

    loadToDo(url, headers) {
        axios.get(`${url}`, {headers})
            .then(response => {
                const todoes = response.data.results
                this.setState({
                    'todoes': todoes,
                })
            })
            .catch(error => console.log(error))
    }

    loadData() {
        const headers = this.createHeaders()
        this.loadUser('http://localhost:8000/api/users', headers);
        this.loadProjects('http://localhost:8000/api/project', headers);
        this.loadToDo('http://localhost:8000/api/to_do', headers);
    };

    componentDidMount() {
        this.getTokenWithStorage()
    }


    render() {
        return (
            <body class="container">
            <div>
                <BrowserRouter>
                    <div class="header-center">
                        <Header token={this.state.token} logout={this.setToken}/>
                    </div>
                    <div class="table-center">
                        <Routes>
                            <Route path='/' element={<UserList users={this.state.users}/>}/>
                            <Route path='/project' element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path='/to_do' element={<ToDoList todoes={this.state.todoes}/>}/>
                            <Route path={'/projects/:id/'}
                                   element={<OneProjectList projects={this.state.projects}/>}/>
                            <Route path='/login' element={<LoginForm
                                get_token={(username, password) => this.get_token(username, password)}/>}/>
                            <Route path='/logout' element={<Logout logout={this.logout.bind(this)} token={this.state.token}/>}/>
                            <Route path='*' element={<Navigate to="/"/>}/>
                        </Routes>
                    </div>

                    <div class='elem-center'>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
            </body>
        )
    }

}

export default App;
