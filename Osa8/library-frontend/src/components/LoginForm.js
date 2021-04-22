const LoginForm = (props) => {
    if (!props.show) return null
    return (
        <div>
            <form onSubmit={props.handleLogin}>
                Nimi: <input type="text" name="tunnus" /><br />
                Salasana: <input type="password" name="password" /> <br />
                <button>Login</button>
            </form>
        </div>
        
    )
}
export default LoginForm