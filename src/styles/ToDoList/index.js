import styled from 'styled-components/native';

export const ContainerToDo = styled.SafeAreaView`
    flex: 1;
    backgroundColor: #40aab8;
    padding: 24px;
    justify-content: center;
`;

export const View = styled.View`
    flex: 0.9;
`;

export const ViewSettings = styled.View`
    flex: 0.06;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`;

export const ViewTasks = styled.View`
    flex: 1;
`

export const ContainerButton = styled.View`   
    align-items: center;
`;

export const FormContainer = styled.View`
    flex: 1;
    justify-content: space-evenly;
    background-color: white;
    border-radius: 20px;
    padding: 0 20px;
    backgroundColor: #40aab8;
`

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
`

export const TituloCard = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: white;
`

export const BotoesCard = styled.View`
    display: flex;
    flex-direction: row;
    width: 25%;
    justify-content: space-between;
`;

export const BotaoCard = styled.TouchableOpacity`
    display: flex;
`