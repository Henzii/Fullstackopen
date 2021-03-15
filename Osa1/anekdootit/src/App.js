import {useState} from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [arpa, setArpa] = useState(0)
  const [pisteet, setPisteet] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))

  const napinPaino = () => {
    const uusiId = Math.floor( Math.random() * anecdotes.length)
    setArpa(uusiId)
  }
  const aanesta = () => {
    const uusiPisteet = [...pisteet]
    if (isNaN(uusiPisteet[arpa])) uusiPisteet[arpa] = 0
    uusiPisteet[arpa]++
    setPisteet(uusiPisteet)
  }
  const viikonAnekdootti = () => {
    let maxValue = 0
    for (var i=0; i < pisteet.length; i++) {
      if (pisteet[i] > pisteet[maxValue]) maxValue = i
    }
    return maxValue
  }
  return (
  <div>
      <h1>Päivän anekdootti</h1>
      <Anekdootti teksti={anecdotes[arpa]} />
      <p>
        <Nappi clickHandler={napinPaino} text="Arvo uusi"/>
        <Nappi clickHandler={aanesta} text="Äänestä" />
      </p>
      <h1>Viikon anekdootti</h1>
      <Anekdootti teksti={anecdotes[viikonAnekdootti()]} />
    </div>
  )
}

const Nappi = ({clickHandler, text}) => { return (<button onClick={clickHandler}>{text}</button>) }

const Anekdootti = ({teksti}) => { return (<p>{teksti}</p>) }

      export default App;
