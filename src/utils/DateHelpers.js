import React from 'react'
import Time from 'react-time'

export default {

  formatDate: (taskDate) => {
    let now = new Date()
    let dateOfTask = new Date(taskDate)

    let within24Hours = now - dateOfTask < 86400000 // ms in 24 hours
    
    return (
      <div>
        {
          (within24Hours)
          ? <Time value={dateOfTask} format="MMM DD, YYYY" relative />
          : <Time value={dateOfTask} format="MMM DD, YYYY" />
        }
      </div>
    )
  }

}