import React, { Component } from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'

class Categories extends Component {
  
  selectCategory(category, event){
    event.preventDefault()
    this.props.selectCategory(category)
  }
  
  render() {
    return(
      <div>
        <h2>Categories</h2>
        <ul>
          { (this.props.tasks.categories == null)
            ? null
            : this.props.tasks.categories.map((category, i) => {
              
              const color = (category == this.props.tasks.selectedCategory) ? 'red' : '#333'
              return (
                <li key={category}>
                  <a onClick={this.selectCategory.bind(this, category)} href="#" style={{color: color}}>{category}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    tasks: state.task
  }
}

const dispatchToProps = (dispatch) => {
  return {
    selectCategory: (category) => dispatch(actions.selectCategory(category))
  }
}

export default connect(stateToProps, dispatchToProps)(Categories)