import React from 'react';
import { TextInput, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { ContainerIconButton, ContainerIconInput, ContainerIcons } from "../../Components/Inputs/StylesInputs.js";

export const Input = ({ secureText, text, value, onChangeText }) => {
    return (
        <SafeAreaView>
            <TextInput
                label={text}
                mode="flat"
                secureTextEntry={secureText}
                value={value}
                onChangeText={onChangeText}
            />
        </SafeAreaView>
    );
};

export const InputIcon = ({ text, value, textBlock, onChangeText, iconTrash, iconCheck, onButtonPress }) => {
    
    return (
        <ContainerIconButton>
            <ContainerIconInput>
                <TextInput
                    label={text}
                    mode="flat"
                    value={value}
                    disabled={textBlock}
                    onChangeText={onChangeText}
                />
            </ContainerIconInput>
            <ContainerIcons>
                <IconButton
                    icon={iconCheck}
                    onPress={onButtonPress}
                />
                <IconButton
                    icon={iconTrash}
                    onPress={onButtonPress}
                />
            </ContainerIcons>
        </ContainerIconButton>
    );
};