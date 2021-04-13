
const notificationReducer = (state = { alive: false }, action) => {
    if (action.type === 'SET_MSG') {
        return { msg: action.msg, error: action.error, alive: true }
    } else if (action.type === 'RESET_MSG') {
        return { msg: '', error: '', alive: false }
    }
    return state
}
export const createNotification = (msg, error) => {
    if (error !== 'error') error='success'
    return async dispatch => {
        setTimeout( () => {
            dispatch(resetNotification())
        }, 5000)

        dispatch(setNotification( msg, error ))
    }
}
export const setNotification = (msg, error ) => {
    return {
        type: 'SET_MSG',
        msg: msg,
        error: error
    }
}
export const resetNotification = () => {
    return {
        type: 'RESET_MSG'
    }
}

export default notificationReducer
