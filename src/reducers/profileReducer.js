import constants from '../constants'

var initialState = {

}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)

  switch(action.type){
    case constants.PROFILE_RECEIVED:
      console.log('PROFILE_RECEIVED: ' + JSON.stringify(action.payload))
      const { id } = action.payload
      updated[id] = action.payload
      return updated
      
    default:
      return updated
  }
}