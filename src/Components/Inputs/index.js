import React, { useState } from 'react';
import { TextInput, IconButton } from 'react-native-paper';
import { ContainerIconButton, ContainerIconInput, ContainerIcons, StyledInput } from "../../Components/Inputs/StylesInputs.js";
import { RFValue } from "react-native-responsive-fontsize";
import deviceDimensions from "../../Device/DeviceInformation.js";

export const Input = ({ secureText, text, value, onChangeText, type, formatNumber, formatPomodoro, disabled }) => {
    const formatInputValue = (inputText) => {
        const numericValue = inputText.replace(/[^0-9]/g, '').replace(/^0+/, '');
        switch (numericValue.length) {
            case 0:
                return '0.00';
            case 1:
                return `0.0${numericValue}`;
            case 2:
                return `0.${numericValue}`;
            default:
                const integerPart = numericValue.slice(0, -2);
                const decimalPart = numericValue.slice(-2);
                return `${integerPart}.${decimalPart}`;
        }
    };

    return (
        <StyledInput
            label={text}
            mode="flat"
            secureTextEntry={secureText}
            value={value}
            disabled={disabled}
            onChangeText={(text) => {
                if (formatNumber) {
                    const formattedValue = formatInputValue(text);
                    onChangeText(formattedValue);
                } else {
                    onChangeText(text);
                }
            }}
            keyboardType={type}
        />
    );
};

export const InputForm = ({ secureText, text, value, onChangeText, disabled }) => {
    return (
        <StyledInput
            label={text}
            mode="flat"
            secureTextEntry={secureText}
            value={value}
            onChangeText={onChangeText}
            disabled={disabled}
        />
    );
};

export const InputPassword = ({ text, value, onChangeText }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);

    return (
        <StyledInput
            label={text}
            mode="flat"
            secureTextEntry={passwordVisible}
            value={value}
            onChangeText={onChangeText}
            right={<TextInput.Icon icon="eye" onPress={() => setPasswordVisible(!passwordVisible)} />}
        />
    )
}

export const InputPencil = ({ text, value, onChangeText }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);

    return (
        <StyledInput
            label={text}
            mode="flat"
            secureTextEntry={passwordVisible}
            value={value}
            onChangeText={onChangeText}
            right={<TextInput.Icon icon="pencil" onPress={() => setPasswordVisible(!passwordVisible)} />}
        />
    )
}

export const DataInput = ({ text, edit, value, disabled, fnModal }) => {
    return (
        <StyledInput
            label={text}
            mode="flat"
            editable={edit}
            disabled={disabled}
            value={value}
            right={<StyledInput.Icon icon="calendar" color={"gray"} onPress={fnModal} />}
        />
    )
}

export const InputIcon = ({ text, value, textBlock = false, onChangeText, iconTwo, iconOne, onButtonPress, interaction }) => {

    return (
        <ContainerIconButton>
            <ContainerIconInput>
                <StyledInput
                    label={text}
                    mode="flat"
                    value={value}
                    disabled={textBlock}
                    onChangeText={onChangeText}
                />
            </ContainerIconInput>
            <ContainerIcons>
                {iconOne
                    &&
                    (<IconButton
                        icon={iconOne}
                        onPress={onButtonPress}
                    />
                    )
                }
                {interaction === false ? null : (
                    iconTwo && (
                        <IconButton
                            icon={iconTwo}
                            onPress={onButtonPress}
                        />
                    )
                )}
            </ContainerIcons>
        </ContainerIconButton>
    );
};