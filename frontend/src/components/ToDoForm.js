import React from "react";

class ToDoForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {'project':props.projects[0].id,'text_to_do':'','users':props.users[0].id,'is_active':true}

    }
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit(event){
        this.props.createToDo(this.state.project,this.state.text_to_do,this.state.users)
        event.preventDefault()
    }
    render(){
        return(
        <form onSubmit={(event)=>this.handleSubmit(event)}>
            <div className="form-group">
                <label htmlFor="project">Имя</label>
                <select name="project" className="form-control" onChange={(event)=>this.handleChange(event)}>
                    {this.props.projects.map((proj)=><option value={proj.id}>{proj.title}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="text_to_do">текст To Do</label>
                <input type="text" className="form-control" name="text_to_do" value={this.state.text_to_do} onChange={(event)=>this.handleChange(event)}/>
            </div>
            <div className="form-group">
                <label htmlFor="users">Имя</label>
                <select name="users" className="form-control" onChange={(event)=>this.handleChange(event)}>
                    {this.props.users.map((item)=><option value={item.id}>{item.first_name}</option>)}
                </select>
            </div>
            <input type="submit" className="btn btn-primary" value='Сохранить'/>
        </form>
        )
    }
}
export default ToDoForm;