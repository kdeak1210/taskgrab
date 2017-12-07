import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Home } from './components/layout'
import store from './stores'


class App extends Component{
  render(){
    return(
      <Provider store={ store.configureStore() }>
        <div>
          <Home />
        </div>
      </Provider >
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))