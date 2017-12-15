import React, { Component } from 'react'
import { CreateTask } from '../presentation'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Tasks extends Component {
  constructor(){
    super()
    this.getTasks = this.getTasks.bind(this)
  }

  getTasks(){
    console.log('getTasks')

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

  componentDidMount(){
    this.getTasks()
  }

  componentDidUpdate(){
    this.getTasks()
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
    const taskList = this.props.tasks[this.props.tasks.selectedCategory]

    return(
      <div>
        <h2>Tasks ---</h2>
        <ol>
        { (taskList == null)
          ? null
          : taskList.map((task, i) => {
            return (
              <li key={task.id}>
                <Link to={`/task/${task.id}`}>
                  {task.title}, {task.category}
                </Link>
              </li>
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