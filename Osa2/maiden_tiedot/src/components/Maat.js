import Maa from './Maa'

const Maat = ({filter, maaData, setFilter}) => {

    const filterMaat = maaData.filter(maa => {
        if (filter === '' || maa.name.indexOf(filter) !== -1) return true
        return false
    })
    
    if (filterMaat.length === 1) return (<Maa maa={filterMaat[0]} />)
    else if (filterMaat.length < 10) return ( <MaaLista maat={filterMaat} setFilter={setFilter} />)
    else return ( <p>Löytyi <b>{filterMaat.length}</b> maata, tarkenna hakua</p>)

}

const MaaLista = ({maat, setFilter}) => {
    return (
        <>
        { maat.map(maa => 
        <li key={maa.alpha2Code}>
            {maa.name} <button onClick={() => setFilter(maa.name)}>Show</button>
        </li>) }
        </>
    )
}

export default Maat