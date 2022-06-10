import React from "react";
import { useParams } from "react-router-dom";
const OneProjectList = ({projects})=>{
    let {id} = useParams()
    let project = projects.filter(project => project.id === +id);
    if (project.length){
        project=project[0]  
    }
    return(
                <table>
            <th>
                Название
            </th>
            <th>
                Ссылка на репозиторий
            </th>
            <th>
                id участников
            </th>
            <tr>
        <td>
            {project.title}
        </td>
        <td>
            {project.directory_link}
        </td>
        <td>
            {project.users.join(", ")}
        </td>
    </tr>
        </table>
    )
}

export default OneProjectList