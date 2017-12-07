import React, { Component } from 'react'
import { CreateTask } from '../presentation'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Tasks extends Component {
  constructor(){
    super()
  }

  componentDidMount(){
    // START LOADING
    if (this.props.tasks[this.props.tasks.selectedCategory] != null){
      return
    }

    /* From the actions, this now returns a promise, so we can do
    some additional handling on the front end (outside of acitons file) */
    this.props.fetchTasks( {category: this.props.tasks.selectedCategory} )
    .then((results) => {
      // STOP LOADING
    })
    .catch((err) => {
      // STOP LOADING
      alert('FetchTasks error!!!')
    })
  }

  componentDidUpdate(){
    console.log('CDU: ' + this.props.tasks.selectedCategory)
    if (this.props.tasks[this.props.tasks.selectedCategory] != null){
      return
    }
      
    this.props.fetchTasks( {category: this.props.tasks.selectedCategory} )
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
        { (this.props.tasks[this.props.tasks.selectedCategory] == null)
          ? null
          : this.props.tasks[this.props.tasks.selectedCategory].map((task, i) => {
            return (
              <li key={task.id}>{task.title}, {task.category}</li>
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