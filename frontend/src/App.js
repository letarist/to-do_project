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
import {BrowserRouter, Link, Route, Routes, useParams} from "react-router-dom";
import style from "./styles/style.css"


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todoes': [],
            'OneProject': [],   
        }
    }
    loadUser(url){
            axios.get(`${url}`)
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users,
                })
            })
            .catch(error => console.log(error))
    }
    loadProjects(url){
            axios.get(`${url}`)
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects,
                })
            })
            .catch(error => console.log(error))
    }
    loadToDo(url){
            axios.get(`${url}`)
            .then(response => {
                const todoes = response.data.results
                this.setState({
                    'todoes': todoes,
                })
            })
            .catch(error => console.log(error))
    }
    
    componentDidMount(){
               this.loadUser('http://localhost:8000/api/users');
               this.loadProjects('http://localhost:8000/api/project');
               this.loadToDo('http://localhost:8000/api/to_do');
            };


    render() {
        return (
            <body class="container">
            <div>

                <BrowserRouter>
                    <div class="header-center">
                        <Header/>
                    </div>
                    <div class="table-center">
                        <Routes>
                            <Route path='/' element={<UserList users={this.state.users}/>}/>
                            <Route path='/project' element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path='/to_do' element={<ToDoList todoes={this.state.todoes}/>}/>
                            <Route path={'/projects/:id/'}
                                   element={<OneProjectList projects={this.state.projects}/>}/>
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
