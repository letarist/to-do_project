import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";


// class ProjectDraw extends React.Component{
//     constructor(props){
//         super(props)
//     }

//     render(){
//         // const [value,setValue]= useState('')
        
//         // const filtered = ({this.props.projects}) => {this.props.projects.filter(project=>{
//         //     return project.title.toLowerCase().includes(value.toLowerCase())
//         // })}
        
//         return(
//         <div>
//                         {/* <form className="search__form">
//                 <input type="text" className="search__input" onChange={(event)=>setValue(event.target.value)}/>
//             </form> */}
//                <table>
//                <th>
//                     Название
//                 </th>
//                 <th>
//                     Ссылка на репозиторий
//                 </th>
//                 <th>
//                     ссылки на участников
//                 </th>
//                 <th>

//                 </th>
//                     {this.props.projects.map((project) => <tr>
//                 <td>
//                     <Link key={project.id} to={`/projects/${project.id}/`}>{project.title}</Link>
//                 </td>
//                 <td>
//                     {project.directory_link}
//                 </td>
//                 <td>
//                     {project.users}
//                 </td>
//                 <td>
//                     <button onClick={() => this.props.deleteProject(project.id)} type='button'>Удалить</button>
//                 </td>
//             </tr>)}
//                 </table>
//         </div>
//         )
//     }
// }

const ProjectDraw=({projects,deleteProject})=>{
    const [value,setValue]= useState('')
        
    const filtered = ({projects}) => {projects.filter(project=>{
        console.log(projects)
        return project.title.toLowerCase().includes(value.toLowerCase())
    })
}
console.log()
return(
    <div>
        <form className="search__form">
            <input type="text" className="search__input" onChange={(event)=>setValue(event.target.value)}/>
        </form>
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
            <th>

            </th>
                {projects.map((project) => <tr>
            <td>
                <Link key={project.id} to={`/projects/${project.id}/`}>{project.title}</Link>
            </td>
            <td>
                {project.directory_link}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Удалить</button>
            </td>
        </tr>)}

           </table>
        <Link key={projects.id} to='/project/create'>Создать</Link>
    </div>
    )
}



export default ProjectDraw