import React from "react";
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(()=>this.props.setToken(''))
        // console.log(this.props.token)
        return (
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Пользователи</NavLink>
                        </li>
                        <li>
                            <NavLink to="/project">Проекты</NavLink>
                        </li>
                        <li>
                            <NavLink to="/to_do">Задачи</NavLink>
                        </li>
                        <li>
                            {this.props.token ? <NavLink to='/logout' onClick={()=>this.props.logout()}>Logout</NavLink> : <NavLink to='/login'>Login</NavLink>}
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}


export default Header