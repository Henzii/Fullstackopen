import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

    const addAnec = (e) => {
        e.preventDefault()

        props.addAnecdote(e.target.anecdootti.value)
        e.target.anecdootti.value = ''
        props.setNotification('Anekdootti lisätty!',5)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnec}>
                <div><input name="anecdootti" /></div>
                <button>create</button>
            </form>
        </>
    )
}
const mapDispatchToProps = {
    addAnecdote,
    setNotification,
}
const connectedAnecdoteForm = connect(
    null,
    mapDispatchToProps,
)(AnecdoteForm)
export default connectedAnecdoteForm