import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Profile extends Component {
  
  componentDidMount(){
    const { profileId } = this.props.match.params
    if (this.props.profiles[profileId] != null) {
      return
    }

    this.props.fetchProfileById(profileId)
    .catch(err => console.log(err))
  }
  
  render(){
    const { profileId } = this.props.match.params    
    const profile = this.props.profiles[profileId]

    return(
      <div>
        { (profile == null) 
          ? <p>No Profile was found for id: '{profileId}'.</p>
          : <div>
              <span>{profile.username}</span><br />
              <span>{profile.email}</span><br />
              <span>{profile.phone}</span><br />
              <span>{profile.timestamp}</span><br />        
            </div>
        }
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