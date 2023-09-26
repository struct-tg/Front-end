import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const Card = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    border: 1px solid #000000;
    background-color: #168B9D;
    justify-content: space-between;
    align-items: center;
    height: 15%;
    margin: 5px 0;
    padding: 0 10px;
`;

export const ViewText = styled.View`
    width: ${(windowWidth * 0.35)}px; 
    height: 50px; 
`;

export const CardTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: white;
    text-align: center;
    overflow: hidden;
`;

export const CardBlockNote = styled.View`
    width: 35%;
    height: 47%;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1.5px solid #000000;
    border-radius: 5px;
`;

export const CardTextStatus = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export const CardButtons = styled.View`
    display: flex;
    flex-direction: row;
    width: 25%;
    justify-content: space-between;
`;

export const CardButton = styled.TouchableOpacity`
    display: flex;
`;