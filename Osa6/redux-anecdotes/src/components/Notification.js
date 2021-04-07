import { connect } from 'react-redux'
import React from 'react'

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!notification.alive) return (<div></div>)
  return (
    <div style={style}>
      {notification.msg}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const connectedNotification = connect(
  mapStateToProps,
)(Notification)
export default connectedNotification