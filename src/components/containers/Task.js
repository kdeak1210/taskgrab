// Render detailed page of an individual task (connected to store)
import React, { Component } from 'react'
import { Authenticate } from '../presentation'
import actions from '../../actions'
import { connect } from 'react-redux'

class Task extends Component {

  componentDidMount(){

  }
  
  render(){
    const { taskId } = this.props.match.params
    const task = this.props.tasks[taskId]

    return(
      <div>
        Task: { task.title }<br />
        Description: { task.description }<br />
        Category: { task.category }<br />
        Creator: { task.profile.username }<br />
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    tasks: state.task
  }
}

export default connect(stateToProps)(Task)