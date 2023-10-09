import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
    border-width: 2px;
    border-radius: 10px;
    padding-vertical: 20px;
    width: 75%;
    background-color: white;
`;

export const ButtonText = styled.Text`
    text-align: center;
`;

export const StyledPomodoroButtonSettings = styled.TouchableOpacity`
    border-width: 2px;
    border-radius: 10px;
    padding-vertical: 15px;
    width: 30%;
    background-color: ${props => (props.disabled ? 'transparent' : '#168B9D')};
    opacity: ${props => (props.disabled ? 0.65 : 1)};
    border: ${props => (props.disabled ? '1px solid #fff' : '1px solid #000')};
`;

export const StyledPomodoroButtonAction = styled.TouchableOpacity`
    border-width: 2px;
    border-radius: 10px;
    padding-vertical: 10px;
    width: 30%;
    align-items: center;
    background-color: ${props => (props.disabled ? 'transparent' : '#168B9D')};
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    border: ${props => (props.disabled ? '1px solid #fff' : '1px solid #000')};
`;