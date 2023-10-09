import React from "react";
import {
    StyledButton,
    ButtonText,
    StyledPomodoroButtonSettings,
    StyledPomodoroButtonAction
} from '../../Components/Button/StylesButton.js';

export const Button = ({ text, onPress }) => {
    return (
        <StyledButton onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </StyledButton>
    );
};

export const PomodoroButtonSettings = ({ text, onPress, disabled }) => {
    return (
        <StyledPomodoroButtonSettings onPress={disabled ? null : onPress} disabled={disabled}>
            <ButtonText style={{ color: disabled ? "white" : "black" }}>{text}</ButtonText>
        </StyledPomodoroButtonSettings>
    );
};

export const PomodoroButtonAction = ({ icon, onPress, disabled }) => {
    return (
        <StyledPomodoroButtonAction onPress={disabled ? null : onPress} disabled={disabled}>
            {icon}
        </StyledPomodoroButtonAction>
    );
};