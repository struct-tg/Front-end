import React, { useContext } from "react"
import { ContentContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles/index.js";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { Image } from "react-native";

const EvaluativeActivity = () => {
    const { username } = useContext(AutenticacaoContext);

    return (
        <ContentContainer>
            <Title>{`Cadastre novas atividades avaliativas, ${username}!`}</Title>
            <ContainerImageInitial>
                <Image
                    source={require('./EvaluativeActivity-Image.png')}
                    style={{ width: "100%", height: "55%" }}
                    resizeMode="cover"
                />
            </ContainerImageInitial>
        </ContentContainer>
    )
}

export default EvaluativeActivity;