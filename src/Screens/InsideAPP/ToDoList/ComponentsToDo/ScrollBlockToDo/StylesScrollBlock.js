import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import deviceDimensions from '../../../../../Device/DeviceInformation';

export const ContainerScroll = styled.ScrollView`
    max-height: 100px;
    margin-bottom: 5px;
`;

export const ViewTop = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const HeaderSituation = styled.Text`
    text-align: center;
    font-size: ${RFValue(20, deviceDimensions.height)}px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
`;