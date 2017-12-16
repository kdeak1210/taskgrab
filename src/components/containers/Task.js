// Render detailed page of an individual task (connected to store)
import React, { Component } from 'react'
import { Authenticate } from '../presentation'
import actions from '../../actions'
import { connect } from 'react-redux'

class Task extends Component {
  constructor(){
    super()
    this.state = {
      message: {
        content: ''
      }
    }
  }

  componentDidMount(){

  }

  updateMessage(event){
    let updated = Object.assign({}, this.state.message)
    updated['content'] = event.target.value
    this.setState({
      message: updated
    })
  }

  submitMessage(){
    let updated = Object.assign({}, this.state.message)
    updated['task'] = this.props.match.params.taskId

    const user = this.props.account.user
    updated['profile'] = {
      id: user.id,
      username: user.username,
    }

    this.props.submitMessage(updated)
    .then(response => {
      //alert('Thank you for replying to this task.')

      // Get the task creator's profile id (send it to backend to get their # (hidden))
      const { taskId } = this.props.match.params
      const task = this.props.tasks[taskId]
      const creatorId = task.profile.id
      
      // Now send a message to the task's creator...
      const params = {
        recipient: creatorId,
        content: 'Does this work 4?'
      }
      
      return this.props.notifyCreator(params) // Return this to continue chain (it returns a promise)
    })
    .then(response => {
      // By this point, the creator should have been notified (no errors)
      alert('Thank you for replying to this task.')
    })
    .catch(err => {
      console.log('ERR: ' + JSON.stringify(err))
      
    })
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
          : <div>
              <h3>Reply</h3>
              <textarea onChange={this.updateMessage.bind(this)} placeholder="Enter Message to Respond" name="" id="" cols="30" rows="10"></textarea>
              <br />
              <button onClick={this.submitMessage.bind(this)}>Submit</button>
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

const dispatchToProps = (dispatch) => {
  return {
    submitMessage: (params) => dispatch(actions.submitMessage(params)),
    notifyCreator: (params) => dispatch(actions.notifyCreator(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Task)