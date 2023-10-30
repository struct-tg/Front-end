import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { Input } from "../../../Components/Inputs";
import { Button } from "../../../Components/Button";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
    ContentContainer,
    ViewContainer,
    UppercaseTitle,
    ContainerButton,
} from "../../../Styles/DefaultStyles";
import { AutenticacaoContext } from "../../../Contexts/UserContext";
import { ChangePassword } from "../../../Services/Requisicoes/OTP/index";
import HelperTextComponent from "../../../Components/HelperText";
import ToastComponent from "../../../Components/Toast/index.js";

const RecoverPassword = ({ route }) => {
    const [toastAlert, setToastAlert] = useState(false);
    const [toastMessageIndex, setToastMessageIndex] = useState(null);
    const [toastMessages, setToastMessages] = useState([
        { title: 'O código expirou, Estudante!', description: 'Tenta criar um novo código.', type: 'error' },
        { title: 'Senha alterada com sucesso, Estudante!', description: 'Parabéns, você alterou a sua senha', type: 'success' },
    ]);
    const { control, handleSubmit, formState: { errors }, watch, setError } = useForm({ mode: "onSubmit" });
    const { tokenJWT } = useContext(AutenticacaoContext);
    const navigation = useNavigation();

    const { otp } = route.params;

    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');

    const goToLogin = () => {
        navigation.navigate('Login');
    }

    const aoSubmitar = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'As senhas não coincidem'
            });
        } else {
            const { confirmPassword, ...objEnvio } = data;
            objEnvio.otp = otp;
            const result = await ChangePassword(objEnvio);
            if (result === true) {

                setToastMessageIndex(1);
                setToastAlert(true);


                goToLogin();
            } else if (result && result.response && result.response.status === 400) {
                setToastMessageIndex(0);
                setToastAlert(true);
            }
        }
    }
    useEffect(() => {
        setToastAlert(false);
    }, [toastAlert]);
    
    return (
        <ContentContainer >
            <ViewContainer >
                <UppercaseTitle>Configure sua nova senha.</UppercaseTitle>

                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Campo obrigatório" }}
                    defaultValue={""}
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={true}
                                text="Digite a sua nova senha: "
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.password && <HelperTextComponent helperType={'error'} helperText={errors.password.message} />}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{ required: "Campo obrigatório" }}
                    defaultValue={""}
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={true}
                                text="Confirme a sua nova senha: "
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.confirmPassword && <HelperTextComponent helperType={'error'} helperText={errors.confirmPassword.message} />}
                        </View>
                    )}
                />

                <ContainerButton >
                    <Button
                        text="Salvar!"
                        onPress={handleSubmit(aoSubmitar)}
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

export default RecoverPassword;