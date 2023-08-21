import React from "react";
import { Input } from "../../Components/Inputs";
import Button from "../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    ViewContainer,
    UppercaseTitle,
    ContainerButton
} from "../../styles/DefaultStyles";

const ScreenRegister = () => {
    const navigation = useNavigation();

    const returnLogin = () => {
        navigation.navigate('Login');
    }

    return (
        <Container>
            <ViewContainer >
                <UppercaseTitle>Faça o seu cadastro.</UppercaseTitle>

                <Input
                    secureText={false}
                    text="Informe o seu nome: "
                />

                <Input
                    secureText={false}
                    text="Informe o seu E-mail: "
                />

                <Input
                    secureText={true}
                    text="Informe a sua senha: "
                />

                <Input
                    secureText={true}
                    text="Confirme a sua senha: "
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