import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`   
    flex: 1;
    justify-content: center;
    background-color: #2aabbf;
    padding: 24px;
`;

export const ViewContainer = styled.View`   
    flex: 0.9;
    justify-content: space-around;
`;

export const UppercaseTitle = styled.Text`   
    text-align: center;
    font-size: 30px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
`;

export const Title = styled.Text`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
`

export const ContainerImage = styled.Image`   
    flex: 0.4;
    width: 80%;
    align-self: center;
    justify-content: center;
    align-items: center;
`;

export const ContainerCenter = styled.View`   
    justify-content: space-evenly;
    align-items: center;
`;

export const ContainerButton = styled.View`   
    align-items: center;
`;

export const LinkNavigators = styled.Text`
    color: white;
    text-align: center;
`;