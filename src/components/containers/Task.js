// Render detailed page of an individual task (connected to store)
import React, { Component } from 'react'
import { Authenticate } from '../presentation'
import actions from '../../actions'
import { connect } from 'react-redux'
import { DateHelpers, TextHelpers } from '../../utils'
import { Link } from 'react-router-dom'

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
    this.fetchMessages()
  }

  fetchMessages(){
    const { taskId } = this.props.match.params    
    this.props.fetchMessages({task: taskId})
    .then(response => {
      const { pathname } = this.props.history.location

      if (pathname != `/task/${taskId}`){ // User navigated away, bail out!
        return
      }
      setTimeout(() => {
        this.fetchMessages()
      }, 10*1000) // 10 seconds
    })
    .catch(err => console.log(err))
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
        content: updated.content,
        taskClaimer: updated.profile.username
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
    const messages = this.props.messages[taskId] || []

    return(
      <section style={{paddingTop: '24px'}}>
        <header className="major">
          <h2 style={{border: 'none', marginBottom: 0}}>{task.title}</h2>
        </header>
        <div className="posts">
          <article style={{background: '#f9f9f9', border: '1px solid #ddd', padding:16}}>
            <strong>{TextHelpers.capitalize(task.category)}</strong>
            <br />
            <strong>
              <Link to={`/profile/${task.profile.id}`}>
                {task.profile.username}
              </Link>
            </strong>
            <br />
            <strong>{DateHelpers.formatDate(task.timestamp)} </strong>
            <hr />
            <p>{task.description}</p>
          </article>
        </div>

        <h3>Replies</h3>
        <ol>
          { (messages.length == 0)
            ? <p>Currently no replies for this task. Be the first!</p>
            : messages.map((message, i) => {
              return(
                <li key={message.id}>
                  {message.content} by 
                  <Link to={`/profile/${message.profile.id}`}>
                    {message.profile.username}
                  </Link>
                </li>
              )
            })
          }
        </ol>

        { (this.props.account.user == null) 
          ? <h3>Please Log in or Register to Reply</h3>
          : <div>
              <h3>Reply</h3>
              <textarea onChange={this.updateMessage.bind(this)} placeholder="Enter Message to Respond" cols="30" rows="5"></textarea>
              <br />
              <button onClick={this.submitMessage.bind(this)}>Submit</button>
            </div>
        }

      </section>
    )
  }
}

const stateToProps = (state) => {
  return {
    account: state.account,
    tasks: state.task,
    messages: state.message
  }
}

const dispatchToProps = (dispatch) => {
  return {
    submitMessage: (params) => dispatch(actions.submitMessage(params)),
    fetchMessages: (params) => dispatch(actions.fetchMessages(params)),
    notifyCreator: (params) => dispatch(actions.notifyCreator(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Task)