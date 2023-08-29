import React from "react";
import { Input } from "../../Components/Inputs";
import { Button } from "../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    ViewContainer,
    UppercaseTitle,
    ContainerButton,
} from "../../styles/DefaultStyles";

const ForgotPassword = () => {
    const navigation = useNavigation();

    const goToPasswordCode = () => {
        navigation.navigate('PasswordCode');
    }

    return (
        <Container>
            <ViewContainer>
                <UppercaseTitle>Recupere sua senha.</UppercaseTitle>

                <Input
                    secureText={false}
                    text="Digite o seu E-mail"
                />

                <ContainerButton>
                    <Button
                        text="Recuperar minha senha!"
                        onPress={goToPasswordCode}
                    />
                </ContainerButton>
            </ViewContainer>
        </Container>
    );
}

export default ForgotPassword;