import React, { useState } from 'react';
import { TextInput, IconButton } from 'react-native-paper';
import { ContainerIconButton, ContainerIconInput, ContainerIcons, StyledInput } from "../../Components/Inputs/StylesInputs.js";

export const Input = ({ secureText, text, value, onChangeText }) => {
    return (
        <TextInput
            label={text}
            mode="flat"
            secureTextEntry={secureText}
            value={value}
            onChangeText={onChangeText}
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
        <TextInput
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
        <TextInput
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

export const InputIcon = ({ text, value, textBlock, onChangeText, iconTwo, iconOne, onButtonPress }) => {

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
                {iconTwo
                    && (
                        <IconButton
                            icon={iconTwo}
                            onPress={onButtonPress}
                        />
                    )

                }
            </ContainerIcons>
        </ContainerIconButton>
    );
};