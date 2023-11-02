import React from 'react';
import StyledInput from "./StylesTextArea.js";

const TextArea = ({ text, value, onChangeText, disabled }) => {
    return (
        <StyledInput
            label={text}
            mode="flat"
            disabled={disabled}
            multiline
            numberOfLines={3}
            value={value}
            onChangeText={onChangeText}
            style={{ minHeight: 80 }}
        />
    );
}

export default TextArea;