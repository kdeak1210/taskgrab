import React, { Component } from 'react'
import { Categories, Tasks } from '../containers'

class Home extends Component {
  render(){
    return(
      <div className="row">

        <div className="col-md-4">
          <Categories />
        </div>
        <div className="col-md-8">
          <Tasks />
        </div>

      </div>
    )
  }
}

export default Home