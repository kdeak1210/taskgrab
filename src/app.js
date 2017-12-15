import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Home } from './components/layout'
import { Task } from './components/containers'
import store from './stores'


class App extends Component{
  render(){
    return(
      <Provider store={ store.configureStore() }>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/task/:taskId" component={Task} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))