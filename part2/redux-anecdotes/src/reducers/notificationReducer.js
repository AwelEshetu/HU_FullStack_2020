const notificationReducer = (state = '', action) => {
    if (action.type === 'SET_NOTIFICATION') {
      return action.content
    } else if (action.type === 'CLEAR_NOTIFICATION') {
      return ''
    }
    return state
  }

  let timeoutId 

  export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    // clears time so that last notification waits for all the waiting time
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}
  
  export const clearNotification = () => (
    {
      type: 'CLEAR_NOTIFICATION'
    }
  )
  
  export default notificationReducer