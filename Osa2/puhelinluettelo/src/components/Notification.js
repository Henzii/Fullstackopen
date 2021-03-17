const Notification = ({message}) => {

    if (message.msg === null) return null

    console.log(message)

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