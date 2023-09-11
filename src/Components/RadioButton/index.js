import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { AlignRadioButton, TextRadioButton } from "./StylesRadioButton";

const RadioButtonComponent = () => {
    const [value, setValue] = useState('first');

    return (
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <AlignRadioButton>
                <RadioButton value="first" />
                <TextRadioButton>Tarefas concluidas.</TextRadioButton>
            </AlignRadioButton>
            <AlignRadioButton>
                <RadioButton value="second" />
                <TextRadioButton>Tarefas não concluidas.</TextRadioButton>
            </AlignRadioButton>
            <AlignRadioButton>
                <RadioButton value="third" />
                <TextRadioButton>Tarefas atrasadas.</TextRadioButton>
            </AlignRadioButton>
        </RadioButton.Group>
    );
};

export default RadioButtonComponent;