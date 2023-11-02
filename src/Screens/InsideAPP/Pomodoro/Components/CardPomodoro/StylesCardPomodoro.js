import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import deviceDimensions from "../../../../../Device/DeviceInformation";

export const CardPomodoro = styled.TouchableOpacity`
    display: flex;
    border-radius: 15px;
    border: 3px solid #fff;
    background-color: #168B9D;
    height: ${RFValue(200, deviceDimensions.height)}px;
    padding: 10px;
    margin-bottom: 5%;
`;

export const TopBlock = styled.View`
    height: 60%;
    width: 100%;
    justify-content: space-evenly;
    border-width: 0 0 3px 0;
    border-color: #fff;
`;

export const LineBlock = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const TitleCardPomodoro = styled.Text`
    font-size: ${RFValue(25, deviceDimensions.height)}px;
    color: #fff;
    font-weight: 500;
`;

export const TimeCardPomodoro = styled.Text`
    font-size: 42px;
    color: #fff;
    font-weight: bold;
`;

export const BotaoCardPomodoro = styled.TouchableOpacity`
    justify-content: flex-end;
`;

export const BotoesCardPomodoro = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

export const BottomBlock = styled.View`
    flex-grow: 1;
    width: 100%;
    justify-content: center;
`;

export const TitleStopsPomodoro = styled.Text`
    font-size: ${RFValue(18, deviceDimensions.height)}px;
    color: #fff;
`;