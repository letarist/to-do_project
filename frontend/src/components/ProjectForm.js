import React from "react";

class ProjectForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {'title':'','directory_link':'','users':props.users[0].id,'is_active':true}
    }
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit(event){
        this.props.createProject(this.state.title,this.state.directory_link,this.state.users)
        event.preventDefault()
    }
    render(){
        return(
        <form onSubmit={(event)=>this.handleSubmit(event)}>
            <div className="form-group">
                <label htmlFor="title">Имя</label>
                 <input type="text" className="form-control" name="title" value={this.state.title} onChange={(event)=>this.handleChange(event)}/>
            </div>
            <div className="form-group">
                <label htmlFor="directory_link">текст To Do</label>
                <input type="text" className="form-control" name="directory_link" value={this.state.directory_link} onChange={(event)=>this.handleChange(event)}/>
            </div>
            <div className="form-group">
                <label htmlFor="users">Имя</label>
                {/* <input type="text" className="form-control" name="users" value={this.state.users} onChange={(event)=>this.handleChange(event)}/> */}
                <select name="users" className="form-control" onChange={(event)=>this.handleChange(event)}>
                    {this.props.users.map((item)=><option value={item.id}>{item.first_name}</option>)}
                </select>
            </div>
            <input type="submit" className="btn btn-primary" value='Сохранить'/>
        </form>
        )
    }
}
export default ProjectForm;