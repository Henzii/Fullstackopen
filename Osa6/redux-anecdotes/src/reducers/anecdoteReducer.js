import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (ane) => {
  return async dispatch => {
    const ret = await anecdoteService.update({...ane, votes: ane.votes+1 })
    dispatch({
      type: 'VOTE',
      data: {
        id: ret.id
      }
    })
  }
}
export const addAnecdote = (data) => {
  return async dispatch => {
    const ane = await anecdoteService.createNew(data)
    console.log(ane)
    dispatch({
      type: 'NEW',
      data: ane
    })
  }
}
export const initAnecdotes = () => {
  return async dispatch => {
    const anes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anes,
    })
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const findAnec = state.find(a => a.id === action.data.id)
      const voteAnec = { ...findAnec, votes: findAnec.votes + 1 }
      return state.map(a => a.id !== voteAnec.id ? a : voteAnec)
    case 'NEW':
      const ret = [...state, action.data ]
      return ret
    case 'INIT':
      return action.data
    default: return state
  }
}

export default reducer