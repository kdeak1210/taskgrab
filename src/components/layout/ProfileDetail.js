import React, { Component } from 'react'
import { Profile } from '../containers'

export default (props) => {
    return(
      <div>
        ProfileDetail LAYOUT
        <Profile {...props} />
      </div>
    )
}
