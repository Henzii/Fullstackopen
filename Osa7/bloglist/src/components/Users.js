import React, { useEffect, useState } from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect( () => {
        usersService.getAll().then(data => setUsers(data))
        console.log(users)
    }, [])
    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr><td>Nimi</td><td>Blogeja</td></tr>
                    {users.map(u => <User key={u.name} name={u.name} count={u.blogs.length} id={u.id}/> )}
                </tbody>
            </table>
        </div>

    )
}
const User = ({ name, count, id }) => {
    const toLink = `/users/${id}`
    return (
        <tr><td><Link to={toLink}>{name}</Link></td><td>{count}</td></tr>
    )
}
export default Users