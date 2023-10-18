import React from "react";
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

const PasswordCode = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const navigation = useNavigation();

    const onSubmit = async (data) => {
        const codigo = Number(data.code);
        await VerifyOTP(codigo);
        navigation.navigate('RecoverPassword', { otp: codigo })
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
        </ContentContainer>
    );
}

export default PasswordCode;