
const userReducer = (state = '', action) => {
    switch(action.type) {
    case 'SET_USER':
        return action.data
    default:
        return state
    }
}

export const setUser = (user, id) => {
    return {
        type: 'SET_USER',
        data: {
            user,
            id
        }
    }
}
export default userReducer