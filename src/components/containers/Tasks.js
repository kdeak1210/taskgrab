import React, { Component } from 'react'
import { CreateTask } from '../presentation'
import { APIManager } from '../../utils'

class Tasks extends Component {
  componentDidMount(){
    APIManager.get('/api/task', null)
    .then((response) => {
      console.log(JSON.stringify(response))
    })
    .catch((err) => {
      alert(err)
    })
  }

  createTask(task){
    console.log('CREATE TASK: ' + JSON.stringify(task))
    APIManager.post('/api/task', task)
    .then((response) => {
      console.log(JSON.stringify(response))      
    })
    .catch((err) => {
      alert(err)
    })
  }

  render(){
    return(
      <div>
        TASKS CONTAINER
        <CreateTask onSubmitTask={this.createTask.bind(this)}/>
      </div>
    )
  }
}

export default Tasks