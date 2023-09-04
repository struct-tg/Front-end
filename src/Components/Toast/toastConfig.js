import { SuccessToast, ErrorToast, InfoToast } from 'react-native-toast-message';

const toastConfig = {
    success: (props) => (
        <SuccessToast
            {...props}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 18,
                fontWeight: 'bold'
            }}
            text2Style={{
                fontSize: 16,
                fontWeight: '400'
            }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 18,
                fontWeight: '400'
            }}
            text2Style={{
                fontSize: 16,
                fontWeight: '400'
            }}
        />
    ),
    info: (props) => (
        <InfoToast
            {...props}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 18,
                fontWeight: '400'
            }}
            text2Style={{
                fontSize: 16,
                fontWeight: '400'
            }}
        />
    ),
}

export default toastConfig;