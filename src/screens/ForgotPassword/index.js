import React, { useState } from "react";
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
    const [email, setEmail] = useState(null);
    const navigation = useNavigation();

    const goToPasswordCode = () => {
        navigation.navigate('PasswordCode');
        console.log('Os dados da tela de recuperação de senha [email]: ', email);
        setEmail(null);
    }

    return (
        <Container>
            <ViewContainer>
                <UppercaseTitle>Recupere sua senha.</UppercaseTitle>

                <Input
                    secureText={false}
                    text="Digite o seu E-mail"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
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