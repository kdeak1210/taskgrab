import React, { Component } from 'react'
import { Authenticate } from '../presentation'
import actions from '../../actions'
import { connect } from 'react-redux'

class Account extends Component {
  constructor(){
    super()
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)    
  }

  componentDidMount(){
    if (this.props.currentUser != null){
      return;
    }

    this.props.checkCurrentUser() // check user on page refresh/CDM hook      
    .then(response => {
      
    })
    .catch(err => {
      console.log('ERROR: ' + err.message)
    })
  }

  login(credentials){
    console.log('login: ' + JSON.stringify(credentials))
    this.props.login(credentials)
    .then((response) => {

    })
    .catch((err) => {
      alert(err.message)
    })
  }

  register(credentials){
    console.log('register: ' + JSON.stringify(credentials))
    this.props.register(credentials)
  }

  render(){
    return(
      <div>
        { (this.props.user == null)
          ? <Authenticate onLogin={this.login} onRegister={this.register}/>
          : <h3>Hello {this.props.user.username}!</h3>
        }
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user // can be null
  }
}

const dispatchToProps = (dispatch) => {
  return {
    register: (credentials) => dispatch(actions.register(credentials)),
    login: (credentials) => dispatch(actions.login(credentials)),
    checkCurrentUser: () => dispatch(actions.checkCurrentUser())
  }
}

export default connect(stateToProps, dispatchToProps)(Account)