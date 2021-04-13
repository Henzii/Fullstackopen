import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
    const data = useSelector(state => state.notification)
    if (!data.alive) return (<></>)
    return (
        <Alert severity={ data.error }>{data.msg}</Alert>
    )
}

export default Notification