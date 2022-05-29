import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Пользователи</Link>
                    </li>
                    <li>
                        <Link to="/projects">Проекты</Link>
                    </li>
                    <li>
                        <Link to="/to_do">Задачи</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header