import React, { useContext } from "react";
import { Image } from "react-native";
import { ContentContainer, ViewContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles/index.js";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";

const ChartHome = () => {
    const { username } = useContext(AutenticacaoContext);

    return (
        <ContentContainer>
            <ViewContainer>
                <Title>{`Cadastre informações para usar os nossos gráficos, ${username}!`}</Title>
                <ContainerImageInitial>
                    <Image
                        source={require('./Chart-Image.png')}
                        style={{ width: "100%", height: "50%" }}
                        resizeMode="cover"
                    />
                </ContainerImageInitial>
            </ViewContainer>
        </ContentContainer>
    );
}

export default ChartHome;