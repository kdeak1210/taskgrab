import React from 'react'
import Time from 'react-time'

export default {

  // If the given date is within 24 hours, return the component w the relative flag
  formatDate: (date) => {
    let now = new Date()
    let datePOSIX = new Date(date)

    let within24Hours = now - datePOSIX < 86400000 // ms in 24 hours
    
    return (
      <div>
        {
          (within24Hours)
          ? <Time value={datePOSIX} format="MMM DD, YYYY" relative />
          : <Time value={datePOSIX} format="MMM DD, YYYY" />
        }
      </div>
    )
  }

}