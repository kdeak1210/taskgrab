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

        { (this.props.account.user == null) 
          ? <h3>Please Log in or Register to Reply</h3>
          : 
            <div>
              <h3>Reply</h3>
              <textarea placeholder="Enter Message to Respond" name="" id="" cols="30" rows="10"></textarea>
              <br />
              <button>Submit</button>
            </div>
        }
        
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    account: state.account,
    tasks: state.task
  }
}

export default connect(stateToProps)(Task)