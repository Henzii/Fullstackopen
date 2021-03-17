const Filter = ({filter}) => {

    const textChange = (event) => {
        filter(event.target.value)
    }

    return (
        <>
        <label>Rahaa maahakua: </label>
        <input onChange={textChange}/>
        </>
    )
}

export default Filter