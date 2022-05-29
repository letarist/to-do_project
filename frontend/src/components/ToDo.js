import React from "react";


const ToDoItem = ({todo}) => {
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

        </tr>
    )
}
const ToDoList = ({todoes}) => {
    return (
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

            {todoes.map((todo) => <ToDoItem todo={todo}/>)}
        </table>
    )
}

export default ToDoList;