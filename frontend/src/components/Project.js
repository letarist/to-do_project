import React from "react";

const ProjectItem = ({project})=>{
    return(<tr>
        <td>
            {project.title}
        </td>
        <td>
            {project.directory_link}
        </td>
        <td>
            {project.users}
        </td>
    </tr>
    )
}
const ProjectList = ({projects})=>{
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
            {projects.map((project) => <ProjectItem project={project}/> )}
        </table>
    )
}
export default ProjectList