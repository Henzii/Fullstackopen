import { useEffect, useState } from 'react'
import axios from 'axios'

const Maa = ({maa}) => {
    return (
        <>
        <h1>{maa.name}</h1>
        Capital: <b>{maa.capital}</b><br/>
        Population: <b>{maa.population}</b>
        <h2>Languages</h2>
            <ul>
            {maa.languages.map(kieli => <li key={kieli.iso639_2}>{kieli.name}</li>)}
            </ul>
        <h2>Flag</h2>
            <img src={maa.flag} width="50%" alt="lippu"/>
        <h2>Weather in {maa.capital}</h2>
            <Weather maa={maa} />
        </>
    )
}
const Weather = ({maa}) => {
    const apikey = process.env.REACT_APP_API_KEY
    const [saaData, setSaaData] = useState([])
    const hakusana= `http://api.weatherstack.com/current?access_key=${apikey}&query=${maa.capital}`

    console.log(saaData)
    useEffect(() => {
    
        axios.get(hakusana)
             .then((res) => {
                setSaaData(res.data)
        })
    },[hakusana])

    if (saaData.length === 0) {
        return (<div>Odotetaan säädataa...</div>)
    } else {
        return (
            <div>
                Temp: {saaData.current.temperature} C <br />
                Wind: {saaData.current.wind_speed} {saaData.current.wind_dir} <br />
                <img src={saaData.current.weather_icons[0]} alt="kuva"/>
            </div>
        )
    }
}
export default Maa