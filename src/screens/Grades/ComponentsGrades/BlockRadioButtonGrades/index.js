import React, { Fragment } from 'react';
import RadioButtonComponent from "../../../../Components/RadioButton";
import TitleBlockViewRadioButton from "./StylesBlockRadioButton";
import { View, Text } from 'react-native';

const BlockRadioButton = () => {
    return (
        <Fragment>
            <TitleBlockViewRadioButton>Como deseja calcular sua nota?</TitleBlockViewRadioButton>
            <RadioButtonComponent
                title={'Media ponderada'}
            />
            <RadioButtonComponent
                title={'Media aritmetica'}
            />
        </Fragment>
    )
}

export default BlockRadioButton;