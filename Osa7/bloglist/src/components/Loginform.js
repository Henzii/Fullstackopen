
import PropTypes from 'prop-types'
import React from 'react'
import { TextField, Button } from '@material-ui/core'

const Loginform = ({ setUserName, setPassword, handleLogin }) => {
    return (
        <>
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={ handleLogin }>
                <div>
                    <TextField style={{ marginBottom: 5 }} label="Tunnus" variant="outlined" type="text" onChange={ (e) => setUserName(e.target.value)} id="username"/>
                </div>
                <div>
                    <TextField style={{ marginBottom: 5 }} label="Salasana" variant="outlined" type="password" onChange={ (e) => setPassword(e.target.value)} id="password"/>
                </div>
                <div>
                    <Button type="submit" id="loginButton" variant="contained" color="primary">Login</Button>
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