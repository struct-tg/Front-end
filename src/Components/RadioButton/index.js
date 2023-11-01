import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { AlignRadioButton, TextRadioButton } from "./StylesRadioButton";

const RadioButtonComponent = ({ id, title, selected, onSelect, disabled }) => {
    return (
        <AlignRadioButton>
            <RadioButton
                value={id}
                status={selected ? 'checked' : 'unchecked'} 
                onPress={() => onSelect(id)}
                disabled={disabled}
            />
            <TextRadioButton>{title}</TextRadioButton>
        </AlignRadioButton>
    );
};

export default RadioButtonComponent;