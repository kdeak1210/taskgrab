import React, { Component } from 'react'
import { CreateTask } from '../presentation'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Tasks extends Component {
  componentDidMount(){
    APIManager.get('/api/task', null)
    .then((response) => {
      //console.log(JSON.stringify(response))
      this.props.tasksReceived(response.results)
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

const stateToProps = (state) => {
  return {
    tasks: state.task
  }
}

const dispatchToProps = (dispatch) => {
  return {
    tasksReceived: (tasks) => dispatch(actions.tasksReceived(tasks))
  }
}

export default connect(stateToProps, dispatchToProps)(Tasks)