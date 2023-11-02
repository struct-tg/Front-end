import styled from 'styled-components/native';

export const ButtonText = styled.Text`
    text-align: center;
`;

export const StyledPomodoroButtonSettings = styled.TouchableOpacity`
    border-width: 2px;
    border-radius: 5px;
    padding-vertical: 15px;
    width: 30%;
    background-color: ${props => (props.disabled ? 'transparent' : '#168B9D')};
    opacity: ${props => (props.disabled ? 0.65 : 1)};
    border: ${props => (props.disabled ? '1px solid #fff' : '#168B9D')};
`;

export const StyledPomodoroButtonAction = styled.TouchableOpacity`
    border-width: 2px;
    border-radius: 5px;
    padding-vertical: 10px;
    width: 30%;
    align-items: center;
    background-color: ${props => (props.disabled ? 'transparent' : '#168B9D')};
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    border: ${props => (props.disabled ? '1px solid #fff' : '#168B9D')};
`;