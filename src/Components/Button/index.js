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
        <StyledPomodoroButtonSettings>
            <ButtonText>{text}</ButtonText>
        </StyledPomodoroButtonSettings>
    );
};

export const PomodoroButtonAction = ({ icon, onPress }) => {
    return (
        <StyledPomodoroButtonAction>
            {icon}
        </StyledPomodoroButtonAction>
    );
};