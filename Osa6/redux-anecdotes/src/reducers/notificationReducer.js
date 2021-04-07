export const setNotification = (msg, aika) => {
    
    return async dispatch => {
        const tID = setTimeout( () => {
            dispatch({
                type: 'HIDE_MSG',
                data: {
                    alive: false,
                    msg: ''
                }
            })
        }, (aika*1000))
        dispatch({
            type: 'SET_MSG',
            data: {
                alive: true,
                msg,
                tID
            }
        })

    }
}
export const hideNotification = () => {
    return {
        type: 'HIDE_MSG',
        data: {
            msg: '',
            alive: false
        }
    }
}
const reducer = (state = { alive: false }, action) => {
    switch(action.type) {
        case 'SET_MSG':
            if (state.alive) clearTimeout(state.tID)
            return action.data
        case 'HIDE_MSG':
            return action.data
        default:
            return state
    }
}

export default reducer