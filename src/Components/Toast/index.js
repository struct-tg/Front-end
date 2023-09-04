import React, { useEffect } from "react";
import Toast from 'react-native-toast-message';

const ToastComponent = ({ ToastType, Title, Description }) => {
    useEffect(() => {
        Toast.show({
            type: ToastType,
            text1: Title,
            text2: Description
        })
    }, [])
}

export default ToastComponent;