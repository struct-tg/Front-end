import React from "react";
import { Input } from "../../Components/Inputs";
import { Button } from "../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from "react-native";
import {
    Container,
    ViewContainer,
    UppercaseTitle,
    ContainerButton,
    LinkNavigators
} from "../../styles/DefaultStyles";


const PasswordCode = () => {
    const navigation = useNavigation();

    const goToNewPassword = () => {
        navigation.navigate('RecoverPassword');
    }

    return (
        <Container>
            <ViewContainer>
                <UppercaseTitle>Código de recuperação.</UppercaseTitle>

                <View>
                    <Input
                        secureText={true}
                        text="Digite o seu código de recuperação."
                    />
                    <TouchableOpacity>
                        <LinkNavigators>Enviar novamente?</LinkNavigators>
                    </TouchableOpacity>
                </View>

                <ContainerButton>
                    <Button
                        text="Validar!"
                        onPress={goToNewPassword}
                    />
                </ContainerButton>
            </ViewContainer>
        </Container>
    );
}

export default PasswordCode;