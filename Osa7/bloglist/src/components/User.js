import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

const User = () => {
    const id = useParams().id

    const [userData, setUserData] = useState(null)
    useEffect( () => {
        usersService.getOne(id).then(res => {
            setUserData(res)
            console.log(res)
        })
    }, [])
    if (!userData) return ( <div><h2>User</h2><p>Haetaan tietoja...</p></div>)
    return (
        <div>
            <h2>{userData.name}</h2>
            <p>Lisännyt {userData.blogs.length} blogia.</p>
            <h3>Lisätyt blogit</h3>
            <p>{userData.blogs.map(b => {
                return ( <li key={b.id}>{b.title}</li> )
            })}</p>
        </div>
    )
}
export default User