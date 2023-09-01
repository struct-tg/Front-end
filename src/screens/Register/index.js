import React, { useState } from "react";
import { Input } from "../../Components/Inputs";
import { Button } from "../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    ViewContainer,
    UppercaseTitle,
    ContainerButton
} from "../../styles/DefaultStyles";

const ScreenRegister = () => {
    const initialDatas = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    }
    const [registro, setRegistro] = useState(initialDatas);

    const navigation = useNavigation();
    const returnLogin = () => {
        navigation.navigate('Login');
        console.log('Os dados da tela de registro: ', registro);
        setRegistro(initialDatas);
    }

    const capturaDadosRegistro = (nomeInput, valorInput) => {
        setRegistro((dadosAnteriores) => ({
            ...dadosAnteriores,
            [nomeInput]: valorInput
        }))
    };

    return (
        <Container>
            <ViewContainer >
                <UppercaseTitle>Faça o seu cadastro.</UppercaseTitle>

                <Input
                    secureText={false}
                    text="Informe o seu nome: "
                    value={registro.name}
                    onChangeText={(value) => capturaDadosRegistro("name", value)}
                />

                <Input
                    secureText={false}
                    text="Informe o seu E-mail: "
                    value={registro.email}
                    onChangeText={(value) => capturaDadosRegistro("email", value)}
                />

                <Input
                    secureText={true}
                    text="Informe a sua senha: "
                    value={registro.password}
                    onChangeText={(value) => capturaDadosRegistro("password", value)}
                />

                <Input
                    secureText={true}
                    text="Confirme a sua senha: "
                    value={registro.passwordConfirm}
                    onChangeText={(value) => capturaDadosRegistro("passwordConfirm", value)}
                />

                <ContainerButton>
                    <Button
                        text="Registrar!"
                        onPress={returnLogin}
                    />
                </ContainerButton>
            </ViewContainer>
        </Container>
    );
}

export default ScreenRegister;