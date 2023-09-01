import React, { useState } from "react";
import { Input } from "../../Components/Inputs";
import { Button } from "../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";
import {
    Container,
    ViewContainer,
    ContainerImage,
    ContainerButton,
    LinkNavigators
} from "../../styles/DefaultStyles";

const ScreenLogin = () => {
    const initialDatas = {
        email: "",
        password: "",
    };
    const [credenciais, setCredenciais] = useState(initialDatas);

    const navigation = useNavigation();
    const goToRegister = () => {
        navigation.navigate('Register');
    };

    const goToForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    const goToApp = () => {
        navigation.navigate('RoutesApp');
        console.log("Dados da tela de login: ", credenciais);
        setCredenciais(initialDatas);
    };

    const capturaCredenciais = (nomeInput, valorInput) => {
        setCredenciais((dadosAnteriores) => ({
            ...dadosAnteriores,
            [nomeInput]: valorInput
        }))
    };

    return (
        <Container>
            <ViewContainer>
                <ContainerImage
                    source={require('./image-Struct.png')}
                    resizeMode="cover"
                />

                <Input
                    secureText={false}
                    text="Informe o seu E-mail: "
                    value={credenciais.email}
                    onChangeText={(value) => capturaCredenciais("email", value)}
                />
                <Input
                    secureText={true}
                    text="Informe a senha: "
                    value={credenciais.password}
                    onChangeText={(value) => capturaCredenciais("password", value)}
                />

                <ContainerButton>
                    <Button
                        text="Entrar"
                        onPress={goToApp}
                    />

                    <TouchableOpacity onPress={goToForgotPassword}>
                        <LinkNavigators>Esqueceu a sua senha?</LinkNavigators>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToRegister}>
                        <LinkNavigators>Não tem conta? Registre-se!</LinkNavigators>
                    </TouchableOpacity>

                </ContainerButton>
            </ViewContainer>
        </Container>
    );
}

export default ScreenLogin;