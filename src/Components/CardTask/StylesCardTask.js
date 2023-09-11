import styled from 'styled-components/native';

/* #02f78d - concluidas */
/* #ed1354 - atrasadas */
/* #eef205 - pendente */
/* #0521f7 - pendente */
/* #35effc - pendente */

export const Card = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    border: 2.5px solid #35effc;
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