import React, { Component } from 'react'

class CreateTask extends Component {
  constructor(){
    super()
    this.state = {
      task: {
        title: '',
        category: 'delivery',
        description: ''
      }
    }
    this.updateTask = this.updateTask.bind(this)
    this.submitTask = this.submitTask.bind(this)
  }

  updateTask(event){
    //console.log(event.target.id + ': ' + event.target.value)
    let updated = Object.assign({}, this.state.task)
    updated[event.target.id] = event.target.value
    this.setState({
      task: updated
    })
  }

  submitTask(){
    this.props.onSubmitTask(this.state.task)
  }

  render(){
    return(
      <div>
        <h3>Create Task</h3>
        <input onChange={this.updateTask} type="text" placeholder="title" id="title" />< br/>
        <input onChange={this.updateTask} type="text" placeholder="description" id="description" />< br/>        
        <select id="category" onChange={this.updateTask}>
          <option value="delivery">Delivery</option>
          <option value="dog walking">Dog Walking</option>
          <option value="house cleaning">House Cleaning</option>          
        </select>
        <br />
        <button onClick={this.submitTask}>Submit Task</button>
      </div>
    )
  }
}

export default CreateTask