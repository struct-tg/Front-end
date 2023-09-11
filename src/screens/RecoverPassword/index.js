import React, { useState } from "react";
import { Input } from "../../Components/Inputs";
import { Button } from "../../Components/Button";
import {
    Container,
    ViewContainer,
    UppercaseTitle,
    ContainerButton,
} from "../../Styles/DefaultStyles";

const RecoverPassword = () => {
    const initialDatas = {
        password: "",
        passwordConfirm: ""
    };
    const [passwordConfig, setPasswordConfig] = useState(initialDatas);

    const capturaDadosConfiguraSenha = (nomeInput, valorInput) => {
        setPasswordConfig((dadosAnteriores) => ({
            ...dadosAnteriores,
            [nomeInput]: valorInput
        }))
    };

    return (
        <Container >
            <ViewContainer >
                <UppercaseTitle>Configure sua nova senha.</UppercaseTitle>

                <Input
                    secureText={true}
                    text="Digite a sua nova senha: "
                    value={passwordConfig.password}
                    onChangeText={(value) => capturaDadosConfiguraSenha("password", value)}
                />
                <Input
                    secureText={true}
                    text="Confirme a sua nova senha: "
                    value={passwordConfig.passwordConfirm}
                    onChangeText={(value) => capturaDadosConfiguraSenha("passwordConfirm", value)}
                />

                <ContainerButton >
                    <Button
                        text="Salvar!"
                        onPress={() => {
                            console.log('Os dados da tela de configuração de senha', passwordConfig)
                            setPasswordConfig(initialDatas)
                        }}
                    />
                </ContainerButton>
            </ViewContainer>
        </Container>
    );
}

export default RecoverPassword;