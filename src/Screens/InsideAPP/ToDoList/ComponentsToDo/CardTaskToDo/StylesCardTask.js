import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import deviceDimensions from "../../../../../Device/DeviceInformation.js";

export const Card = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    border: 3px solid #35effc;
    background-color: #168B9D;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    margin: 5px 0;
    padding: 0 10px;
`;

export const TituloCard = styled.Text`
    font-size: ${RFValue(18, deviceDimensions.height)}px;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
`;

export const BotoesCard = styled.View`
    display: flex;
    flex-direction: row;
    width: 25%;
    justify-content: space-between;
`;

export const BotaoCard = styled.TouchableOpacity`
    display: flex;
`;

export const DateInformation = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;