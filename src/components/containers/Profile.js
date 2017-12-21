import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Profile extends Component {
  
  componentDidMount(){
    const { profileId } = this.props.match.params

    if (this.props.profiles[profileId] == null) {
      this.props.fetchProfileById(profileId)    
    }
  }
  
  render(){
    return(
      <div>
        Profile Container
        This is the profile page for {this.props.match.params.profileId}
      </div>
    )
  }
}


const stateToProps = (state) => {
  return {
    profiles: state.profile
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchProfileById: (id) => dispatch(actions.fetchProfileById(id))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)