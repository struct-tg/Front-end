import React, { useState, useContext } from "react";
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

const RecoverPassword = ({ route }) => {
    const { control, handleSubmit, formState: { errors }, watch, setError } = useForm({ mode: "onChange" });
    const { tokenJWT } = useContext(AutenticacaoContext);
    const navigation = useNavigation();

    const { otp } = route.params;
    
    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');

    const goToHome = () => {
        navigation.navigate('Home');
    }

    const aoSubmitar = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'As senhas não coincidem'
            });
        } else {
            try {
                const { confirmPassword, ...objEnvio } = data;
                const result = await ChangePassword(tokenJWT, objEnvio)
                if (result) {
                    goToHome();
                } else {
                    console.log('deu ruim');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

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
        </ContentContainer>
    );
}

export default RecoverPassword;