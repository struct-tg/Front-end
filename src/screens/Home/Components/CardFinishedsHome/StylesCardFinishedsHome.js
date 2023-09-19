import styled from 'styled-components/native';

export const CardFinishedHome = styled.View`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    border: 3px solid #35effc;
    background-color: #168B9D;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin: 3px 0;
    padding: 0 5px;    
`;

export const CardTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
`;

export const BotaoCard = styled.TouchableOpacity`
    display: flex;
`;