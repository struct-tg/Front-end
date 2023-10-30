import React from "react";
import { View } from "react-native";
import { Input } from "../../../Components/Inputs";
import { Button } from "../../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import {
    ContentContainer,
    ViewContainer,
    UppercaseTitle,
    ContainerButton,
} from "../../../Styles/DefaultStyles";
import { generateOTP } from "../../../Services/Requisicoes/OTP";
import HelperTextComponent from "../../../Components/HelperText";

const ForgotPassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

    const navigation = useNavigation();
    const goToPasswordCode = () => {
        navigation.navigate('PasswordCode');
    }

    const onSubmit = async (data) => {
        await generateOTP(data)
        goToPasswordCode();
    }

    return (
        <ContentContainer>
            <ViewContainer>
                <UppercaseTitle>Recupere sua senha.</UppercaseTitle>

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Campo obrigatório.', pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido',
                        },
                    }}
                    defaultValue=""
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={false}
                                text="Digite o seu E-mail"
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.email && (<HelperTextComponent helperType={"error"} helperText={errors.email.message} />)}
                        </View>
                    )}
                />
                <ContainerButton>
                    <Button
                        text="Recuperar minha senha!"
                        onPress={handleSubmit(onSubmit)}
                    />
                </ContainerButton>
            </ViewContainer>
        </ContentContainer>
    );
}

export default ForgotPassword;