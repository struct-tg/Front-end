import React from "react";
import { Input } from "../../Components/Inputs";
import Button from "../../Components/Button";
import {
    Container,
    ViewContainer,
    UppercaseTitle,
    ContainerButton,
} from "../../styles/DefaultStyles";

const RecoverPassword = () => {

    return (
        <Container >
            <ViewContainer >
                <UppercaseTitle>Configure sua nova senha.</UppercaseTitle>

                <Input
                    secureText={true}
                    text="Digite a sua nova senha: "
                />
                <Input
                    secureText={true}
                    text="Confirme a sua nova senha: "
                />

                <ContainerButton >
                    <Button
                        text="Salvar!"
                        onPress={() => null}
                    />
                </ContainerButton>
            </ViewContainer>
        </Container>
    );
}

export default RecoverPassword;