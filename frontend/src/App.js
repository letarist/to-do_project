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
import ToDoForm from './components/ToDoForm';
import ProjectForm from "./components/ProjectForm";
import ProjectDraw from './components/Project';

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

    createToDo(project, text_to_do, users) {
        const headers = this.createHeaders()
        // console.log(headers)
        const data = {project: project, text_to_do: text_to_do, users: users}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/to_do/`, data, {headers: headers})
            .then(response => {
                let new_to_do = response.data

                const user = this.state.users.filter((item) => item.id === new_to_do.user)[0]
                new_to_do.user = user
                const project = this.state.projects.filter((item) => item.id === new_to_do.project)[0]
                new_to_do.project = project
                this.setState({
                        todoes: [...this.state.todoes, new_to_do]
                    }
                )
            })
            .catch(error => console.log(error))
    }

    createProject(title, directory_link, users) {
        const headers = this.createHeaders()
        const data = {title: title, directory_link: directory_link, users: users}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers: headers})
            .then(response => {
                let new_to_do = response.data
                const user = this.state.users.filter((item) => item.id === new_to_do.user)[0]
                new_to_do.user = user
                this.setState({
                        todoes: [...this.state.todoes, new_to_do]
                    }
                )
            })
            .catch(error => console.log(error))
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
                var result = response.data.results
                var answer = []
                for (var index = 0; index < result.length; ++index) {
                    if (result[index].is_active == true) {
                        answer.push(result[index])
                    }
                    this.setState({
                        'todoes': answer
                    })
                }
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

    deleteProject(id) {
        const headers = this.createHeaders()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers: headers})
            .then(response => {
                this.setState({'project': this.state.projects.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error))
    }

    deleteToDo(id) {
        const headers = this.createHeaders()
        axios.delete(`http://127.0.0.1:8000/api/to_do/${id}`, {headers: headers})
            .then(response => {
                this.setState({'todoes': this.state.todoes.filter((item) => item.id != id)})
            })
            .catch((error) => console.log(error))
    }


    render() {
        return (

            <div>
                <div className="container">
                    <BrowserRouter>
                        <div className="header-center">
                            <Header token={this.state.token} logout={this.setToken}/>
                        </div>
                        <div className="table-center">
                            <Routes>
                                <Route path='/' element={<UserList users={this.state.users}/>}/>
                                <Route path='/project' element={<ProjectDraw projects={this.state.projects}
                                                                             deleteProject={(id) => this.deleteProject(id)}/>}/>
                                <Route path='/to_do/create'
                                       element={<ToDoForm users={this.state.users} projects={this.state.projects}
                                                          createToDo={(project, text_to_do, users) => this.createToDo(project, text_to_do, users)}/>}/>
                                <Route path='/project/create'
                                       element={<ProjectForm users={this.state.users}
                                                             createProject={(title, directory_link, users) => this.createProject(title, directory_link, users)}/>}/>
                                <Route path='/to_do' element={<ToDoList todoes={this.state.todoes}
                                                                        deleteToDo={(id) => this.deleteToDo(id)}/>}/>
                                <Route path={'/projects/:id/'}
                                       element={<OneProjectList projects={this.state.projects}/>}/>
                                <Route path='/login' element={<LoginForm
                                    get_token={(username, password) => this.get_token(username, password)}/>}/>
                                <Route path='/logout'
                                       element={<Logout logout={this.logout.bind(this)} token={this.state.token}/>}/>
                                <Route path='*' element={<Navigate to="/"/>}/>

                            </Routes>
                        </div>
                        <div className='elem-center'>
                            <Footer/>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        )
    }

}

export default App;
