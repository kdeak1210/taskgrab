import constants from '../constants'

var initialState = {

}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)

  switch(action.type){
    case constants.MESSAGES_RECEIVED:
      console.log('MESSAGED_RECEIVED: ' + JSON.stringify(action.payload))
      // PAYLOAD: [{"profile":{"username":"test","id":"5a346b8ee713463275d7e15f"},"task":"5a290dec2d2db40ed147c7cc","content":"send me in","timestamp":"2017-12-16T22:32:23.490Z","id":"5a359ef76c67d90cb0ddb395"},{"profile":{"username":"test","id":"5a346b8ee713463275d7e15f"},"task":"5a290dec2d2db40ed147c7cc","content":"I can do this...","timestamp":"2017-12-16T20:08:29.907Z","id":"5a357d3dbe62386d89c06dfe"}]
      let { task } = action.params
      updated[task] = action.payload
      return updated

    default:
      return updated
  }

}