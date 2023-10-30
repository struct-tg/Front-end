import React from "react";
import { StyledPomodoroButtonAction, StyledPomodoroButtonSettings, ButtonText } from "./StylesButtonPomodoro.js";

export const PomodoroButtonSettings = ({ text, onPress, disabled }) => {
    return (
        <StyledPomodoroButtonSettings onPress={disabled ? null : onPress} disabled={disabled}>
            <ButtonText style={{ color: "white" }}>{text}</ButtonText>
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