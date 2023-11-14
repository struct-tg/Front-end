import { SuccessToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { RFValue } from 'react-native-responsive-fontsize';
import deviceDimensions from "../../Device/DeviceInformation.js";

const toastConfig = {
    success: (props) => (
        <SuccessToast
            {...props}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: RFValue(16, deviceDimensions.height),
                fontWeight: '400'
            }}
            text2Style={{
                fontSize: RFValue(14, deviceDimensions.height),
                fontWeight: '400'
            }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: RFValue(16, deviceDimensions.height),
                fontWeight: '400'
            }}
            text2Style={{
                fontSize: RFValue(14, deviceDimensions.height),
                fontWeight: '400'
            }}
        />
    ),
    info: (props) => (
        <InfoToast
            {...props}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: RFValue(16, deviceDimensions.height),
                fontWeight: '400'
            }}
            text2Style={{
                fontSize: RFValue(14, deviceDimensions.height),
                fontWeight: '400'
            }}
        />
    ),
}

export default toastConfig;