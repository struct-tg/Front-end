import React from "react";
import { StyledButton, ButtonText } from '../../Components/Button/StylesButton.js';

const Button = ({ text, onPress }) => {
    return (
        <StyledButton onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </StyledButton>
    );
};

export default Button;