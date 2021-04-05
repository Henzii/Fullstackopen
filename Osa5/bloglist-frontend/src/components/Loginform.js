
import PropTypes from 'prop-types'
import React from 'react'

const Loginform = ({ setUserName, setPassword, handleLogin }) => {
    return (
        <>
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={ handleLogin }>
                <div>
                User: <input type="text" onChange={ (e) => setUserName(e.target.value)} id="username"/>
                </div>
                <div>
                Password: <input type="password" onChange={ (e) => setPassword(e.target.value)} id="password"/>
                </div>
                <div>
                    <input type="submit" id="loginButton"/>
                </div>
            </form>
        </>
    )
}

Loginform.propTypes = {
    setUserName: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired
}
export default Loginform