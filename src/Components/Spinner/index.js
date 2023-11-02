import Spinner from 'react-native-loading-spinner-overlay';
import React from 'react'

const SpinnerComponent = ({ state, text }) => {
    return (
        <Spinner
            visible={state}
            textContent={text}
            textStyle={{ color: '#fff' }}
        />
    )
}

export default SpinnerComponent;