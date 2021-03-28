const Notification = ({message}) => {

    if (message.msg === null) return null

    if (message.type === "error") {
        return (
            <div className="errorMessage">
                {message.msg}
            </div>
        )
    }

    return (
        <div className="notifyMessage">
            {message.msg}
        </div>
    )

}

export default Notification