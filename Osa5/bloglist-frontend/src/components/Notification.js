import React from 'react'

const Notification = ({ msg }) => {
    if (msg.msg === null) return ('')
    return (
        <div className={msg.type}>{msg.msg}</div>
    )
}

export default Notification