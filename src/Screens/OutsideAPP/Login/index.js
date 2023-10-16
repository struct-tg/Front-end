import React, { useContext, useState } from "react";
import { Input } from "../../../Components/Inputs";
import { Button } from "../../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AutenticacaoContext } from "../../../Contexts/UserContext";
import {
    ContentContainer,
    ViewContainer,
    ContainerImage,
    ContainerButton,
    LinkNavigators
} from "../../../Styles/DefaultStyles";
import HelperTextComponent from "../../../Components/HelperText";
import ToastComponent from "../../../Components/Toast";

const ScreenLogin = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const { login } = useContext(AutenticacaoContext);
    const [toastVisible, setToastVisible] = useState(false);
    const navigation = useNavigation();

    const goToRegister = () => {
        navigation.navigate('Register');
    };

    const goToForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    const goToApp = () => {
        navigation.navigate('RoutesApp');
    };

    const onSubmit = async (datasLogin) => {
        const credentials = await login(datasLogin);
        if (credentials) {
            goToApp();
        } else {
            setToastVisible(true);
        }
    }

    return (
        <ContentContainer>
            <ViewContainer>
                <ContainerImage
                    source={require('./image-Struct.png')}
                    resizeMode="cover"
                />
                <Controller
                    control={control}
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={false}
                                text="Informe o seu E-mail: "
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.email && (
                                <HelperTextComponent helperType={"error"} helperText={errors.email.message} />
                            )}
                        </View>
                    )}
                    name="email"
                    rules={{ required: 'Campo obrigatório' }}
                    defaultValue=""
                />

                <Controller
                    control={control}
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={true}
                                text="Informe a senha: "
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.password && (
                                <HelperTextComponent helperType={"error"} helperText={errors.password.message} />
                            )}
                        </View>
                    )}
                    name="password"
                    rules={{ required: 'Campo obrigatório' }}
                    defaultValue=""
                />

                <ContainerButton>
                    <Button
                        text="Entrar"
                        onPress={handleSubmit(onSubmit)}
                    />

                    <TouchableOpacity onPress={goToForgotPassword}>
                        <LinkNavigators>Esqueceu a sua senha?</LinkNavigators>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToRegister}>
                        <LinkNavigators>Não tem conta? Registre-se!</LinkNavigators>
                    </TouchableOpacity>

                </ContainerButton>
            </ViewContainer>

            {toastVisible && (
                <ToastComponent
                    key={Math.random()}
                    ToastType={'error'}
                    Title={'Verifique suas credenciais.'}
                    Description={'E-mail ou senha incorretas.'}
                />
            )}
        </ContentContainer>
    );
}

export default ScreenLogin;