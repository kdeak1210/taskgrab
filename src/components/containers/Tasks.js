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
    this.props.submitTask(task)
    .then((result) => {
      //console.log(JSON.stringify(result))
    })
    .catch((err) => {
      console.log('ERROR: ' + JSON.stringify(err))
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
    submitTask: (task) => dispatch(actions.submitTask(task))    
    //taskCreated: (task) => dispatch(actions.taskCreated(task))
  }
}

export default connect(stateToProps, dispatchToProps)(Tasks)