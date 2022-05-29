import React from "react";
const OneProjectList = ({OneProject})=>{
    return(
                <table>
            <th>
                Название
            </th>
            <th>
                Ссылка на репозиторий
            </th>
            <th>
                ссылки на участников
            </th>
            <tr>
        <td>
            {OneProject.title}
        </td>
        <td>
            {OneProject.directory_link}
        </td>
        <td>
            {OneProject.users}
        </td>
    </tr>
        </table>
    )
}

export default OneProjectList