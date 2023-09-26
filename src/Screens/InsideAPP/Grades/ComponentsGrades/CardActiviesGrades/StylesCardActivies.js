import styled from 'styled-components/native';

export const BlockInformation = styled.View`
    width: auto;
    justify-content: center;
    align-items: center;
`;

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
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
`;
export const DateCard = styled.Text`
    font-size: 13px;
    color: white;
`;

export const InlineBlock = styled.View`
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
`;

export const BlockGradeInformation = styled.View`
    width: 20%;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    border-radius: 5px;
    background-color: white;
`;

export const TextBlockGradeInformation = styled.Text`
    font-size: 13px;
    font-weight: bold;
`;

export const BotaoCard = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
`;