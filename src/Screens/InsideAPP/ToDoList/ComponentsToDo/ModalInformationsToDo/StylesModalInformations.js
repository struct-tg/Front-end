import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import deviceDimensions from '../../../../../Device/DeviceInformation';
export const TextTitle = styled.Text`
    font-size: ${RFValue(25, deviceDimensions.height)}px;
    text-align: center;
    color: #FFFFFF;
    font-weight: bold;
`;

export const TextColorsModal = styled.Text`
    font-size: ${RFValue(18, deviceDimensions.height)}px;
    color: #FFFFFF;
`;