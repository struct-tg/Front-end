import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    background-color: #168B9D;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin: 5px 0;
    padding: 0 10px;
`;

export const TituloCard = styled.Text`
    font-size: 24px;
    font-weight: bold;
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