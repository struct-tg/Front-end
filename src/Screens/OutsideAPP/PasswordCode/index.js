import React, { useState } from "react";
import { Input } from "../../../Components/Inputs";
import { Button } from "../../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import {
    ContentContainer,
    ViewContainer,
    UppercaseTitle,
    ContainerButton,
    LinkNavigators
} from "../../../Styles/DefaultStyles";
import { VerifyOTP } from "../../../Services/Requisicoes/OTP";
import HelperTextComponent from "../../../Components/HelperText";
import ToastComponent from "../../../Components/Toast/index.js";

const PasswordCode = () => {
    const [toastAlert, setToastAlert] = useState(false);
    const [toastMessages, setToastMessages] = useState([
        { title: 'O código expirou, Estudante!', description: 'Tenta criar um novo código.', type: 'error' },
        { title: 'Este código não existe, Estudante!', description: 'Informe um código válido.', type: 'error' },
    ]);
    const [toastMessageIndex, setToastMessageIndex] = useState(null);
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onSubmit" });
    const navigation = useNavigation();

    const onSubmit = async (data) => {
        const codigo = Number(data.code);
        const result = await VerifyOTP(codigo);
        if (result === true) {
            navigation.navigate('RecoverPassword', { otp: codigo });
        } else if (result && result.response && result.response.status === 400) {
            setToastMessageIndex(0);
            setToastAlert(true);
        } else if (result && result.response && result.response.status === 404) {
            setToastMessageIndex(1);
            setToastAlert(true);
        }
    }

    return (
        <ContentContainer>
            <ViewContainer>
                <UppercaseTitle>Código de recuperação.</UppercaseTitle>

                <Controller
                    control={control}
                    name="code"
                    defaultValue=""
                    rules={{ required: 'O campo é obrigatório' }}
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={true}
                                text="Digite o seu código de recuperação."
                                value={field.value}
                                onChangeText={field.onChange}
                                type={'numeric'}
                            />
                            <TouchableOpacity>
                                <LinkNavigators>Enviar novamente?</LinkNavigators>
                            </TouchableOpacity>
                            {errors.code && (<HelperTextComponent helperType={"error"} helperText={errors.code.message} />)}
                        </View>
                    )}
                />

                <ContainerButton>
                    <Button
                        text="Validar!"
                        onPress={handleSubmit(onSubmit)}
                    />
                </ContainerButton>
            </ViewContainer>

            {toastAlert
                &&
                (<ToastComponent
                    Title={toastMessages[toastMessageIndex].title}
                    Description={toastMessages[toastMessageIndex].description}
                    ToastType={toastMessages[toastMessageIndex].type}
                    key={Math.random()}
                />
                )
            }
        </ContentContainer>
    );
}

export default PasswordCode;