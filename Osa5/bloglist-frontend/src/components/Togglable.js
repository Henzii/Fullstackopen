
import React, { useState, useImperativeHandle } from 'react'
import PropType from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    const showToggle = { display: (visible) ? '' : 'none' }
    const hideToggle = { display: (visible) ? 'none ' : '' }

    const toggleVis = () => {
        setVisible (!visible)
    }
    useImperativeHandle(ref, () => {
        return {
            toggleVis
        }
    })

    return (
        <>
            <div style={showToggle}>
                {props.children}
                <button onClick={toggleVis}>Hide</button>
            </div>
            <div style={hideToggle}>
                <button onClick={toggleVis}>{props.buttonLabel}</button>
            </div>
        </>

    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropType.string.isRequired
}

export default Togglable