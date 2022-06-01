import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
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
                </ul>
            </nav>
        </header>
    )
}

export default Header