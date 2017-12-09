import React, { Component } from 'react'
import { Account, Categories, Tasks } from '../containers'

class Home extends Component {
  render(){
    return(
      <div className="row">

        <div className="col-md-2">
          <Categories />
        </div>
        <div className="col-md-8">
          <Tasks />
        </div>
        <div className="col-md-2">
          <Account />
        </div>

      </div>
    )
  }
}

export default Home