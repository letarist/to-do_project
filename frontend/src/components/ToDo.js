import React from "react";
import { Link } from "react-router-dom";


const ToDoItem = ({todo,deleteToDo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text_to_do}
            </td>
            <td>
                {todo.create_to_do}
            </td>
            <td>
                {todo.update_to_do}
            </td>
            <td>
                {todo.users}
            </td>
            <td>
                <button onClick={()=>deleteToDo(todo.id)} type='button'>Удалить</button>
            </td>

        </tr>
    )
}
const ToDoList = ({todoes,deleteToDo}) => {
    return (
        <div>
            <table >
                <th>
                    Название проекта
                </th>
                <th>
                    Содержание заметки
                </th>
                <th>
                    Дата создания
                </th>
                <th>
                    Дата обновления
                </th>
                <th>
                    Ссылки на создателя
                </th>
                {todoes.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </table>
            <Link key={todoes.id} to='/to_do/create'>Создать</Link>
        </div>
    )
}

export default ToDoList;