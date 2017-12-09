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

  login(credentials){
    console.log('login: ' + JSON.stringify(credentials))

  }

  register(credentials){
    console.log('register: ' + JSON.stringify(credentials))
    this.props.register(credentials)
  }

  render(){
    return(
      <div>
        
        <Authenticate onLogin={this.login} onRegister={this.register}/>

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
    register: (credentials) => dispatch(actions.register(credentials))
  }
}

export default connect(stateToProps, dispatchToProps)(Account)