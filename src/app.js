import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ClaimTask, Home, ProfileDetail } from './components/layout'
import store from './stores'


class App extends Component{
  render(){
    return(
      <Provider store={ store.configureStore() }>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/task/:taskId" component={ClaimTask} />
            <Route path="/profile/:profileId" component={ProfileDetail} />            
          </Switch>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))