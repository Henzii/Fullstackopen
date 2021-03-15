import React, {useState} from 'react'

const App = () => {

  const [palautteet, setPalaute] = useState({
    huono: 0,
    neutraali: 0,
    hyva: 0
  })
  
  const huonoPalaute = () => setPalaute({...palautteet, huono: palautteet.huono + 1})
  const neutraaliPalaute = () => setPalaute({...palautteet, neutraali: palautteet.neutraali + 1})
  const hyvaPalaute =() => setPalaute({...palautteet, hyva: palautteet.hyva + 1})

  return (
    <div>
      <h1>Unicafe</h1>
      <Nappi handleClick={huonoPalaute} text="Negatiivinen :(" />
      <Nappi handleClick={neutraaliPalaute} text="Neutraali :/" />
      <Nappi handleClick={hyvaPalaute} text="Hyvä palaute :)" />
      <Statistiikat palautteet={palautteet} />
    </div>
  )

}
const Nappi = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}
const Statistiikat = (props) => {
  const yhteensa = () => props.palautteet.huono+props.palautteet.neutraali+props.palautteet.hyva
  const keskiarvo = () => (props.palautteet.hyva - props.palautteet.huono) / yhteensa()
  const hyvaProssa = () => props.palautteet.hyva / yhteensa() * 100
  if (yhteensa() > 0) {
    return (
      <div>
        <table>
        <StatsiRivi teksti="Hyvä" arvo={props.palautteet.hyva} />
        <StatsiRivi teksti="Neutraali" arvo={props.palautteet.neutraali} />
        <StatsiRivi teksti="Huono" arvo={props.palautteet.huono} />
        <StatsiRivi teksti="Yhteensä" arvo={yhteensa()} />
        <StatsiRivi teksti="Kesiarvo" arvo={keskiarvo()} />
        <StatsiRivi teksti="Hyvien osuus (%)" arvo={hyvaProssa()} />
        </table>


      </div>
    )
  }
  return (
    <p>Tiastot näytetään jahka on jotain dataa tarjolla</p>
  )
}
const StatsiRivi = ({teksti, arvo}) => {
  return (
    <tbody>
      <tr>
        <td>{teksti}</td><td>{arvo}</td>
      </tr>
    </tbody>


  )
}
export default App;
