import React, { Component } from 'react'
import { CreateTask } from '../presentation'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Tasks extends Component {

  componentDidMount(){
    // START LOADING

    /* From the actions, this now returns a promise, so we can do
    some additional handling on the front end (outside of acitons file) */
    this.props.fetchTasks(null)
    .then((results) => {
      // STOP LOADING
    })
    .catch((err) => {
      // STOP LOADING
      alert('FetchTasks error!!!')
    })
  }

  createTask(task){
    console.log('CREATE TASK: ' + JSON.stringify(task))
    APIManager.post('/api/task', task)
    .then((response) => {
      //console.log(JSON.stringify(response))
      this.props.taskCreated(response.result)
    })
    .catch((err) => {
      alert(err)
    })
  }

  render(){
    return(
      <div>
        <h2>Tasks ---</h2>
        <ol>
        { (this.props.tasks.all == null)
          ? null
          : this.props.tasks.all.map((task, i) => {
            return (
              <li key={task.id}>{task.title}</li>
            )
          })
        }
        </ol>
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
    fetchTasks: (params) => dispatch(actions.fetchTasks(params)),    
    tasksReceived: (tasks) => dispatch(actions.tasksReceived(tasks)),
    taskCreated: (task) => dispatch(actions.taskCreated(task))
  }
}

export default connect(stateToProps, dispatchToProps)(Tasks)