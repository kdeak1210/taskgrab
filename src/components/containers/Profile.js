import React, { Component } from 'react'
import { connect } from 'react-redux'

class Profile extends Component {
  render(){
    return(
      <div>
        Profile Container
        This is the profile page for {this.props.match.params.profileId}
      </div>
    )
  }
}

export default Profile