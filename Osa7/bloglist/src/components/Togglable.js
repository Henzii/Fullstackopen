
import React, { useState, useImperativeHandle } from 'react'
import PropType from 'prop-types'
import { Button } from '@material-ui/core'

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
                <Button color="primary" variant="outlined" onClick={toggleVis}>Hide</Button>
            </div>
            <div style={hideToggle}>
                <Button color="primary" variant="outlined" onClick={toggleVis}>{props.buttonLabel}</Button>
            </div>
        </>

    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropType.string.isRequired
}

export default Togglable