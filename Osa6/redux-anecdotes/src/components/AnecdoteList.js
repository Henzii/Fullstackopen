import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return (
    <>
        <div>{anecdote.content}</div>
        <div>Votes: {anecdote.votes} <button onClick={handleClick}>vote</button></div>
    </>
    )
}
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === '')
            return state.anecdotes
        else return state.anecdotes.filter(ane => ane.content.includes(state.filter) )
    })

    const vote = (ane) => {
        dispatch(voteAnecdote(ane))
        dispatch(setNotification(`Äänestit anekdoottia ${ane.content}!`,5))
    }
    return (
        <div>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(a =>
                <Anecdote anecdote={a} key={a.id} handleClick={() => vote(a)}/>
            )}
        </div>
    )

}
export default AnecdoteList
