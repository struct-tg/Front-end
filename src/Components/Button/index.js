import React from "react";
import { StyledButton, ButtonText, StyledPomodoroButtonSettings, StyledPomodoroButtonAction } from '../../Components/Button/StylesButton.js';

export const Button = ({ text, onPress }) => {
    return (
        <StyledButton onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </StyledButton>
    );
};

export const PomodoroButtonSettings = ({ text, onPress }) => {
    return (
        <StyledPomodoroButtonSettings onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </StyledPomodoroButtonSettings>
    );
};

export const PomodoroButtonAction = ({ icon, onPress }) => {
    return (
        <StyledPomodoroButtonAction onPress={onPress}>
            {icon}
        </StyledPomodoroButtonAction>
    );
};