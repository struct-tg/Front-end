import React, { useContext } from 'react'
import { TextTitle, TextModal, TextColorsModal } from "./StylesModalInformations.js";
import { UppercaseTitle } from "../../../../../Styles/DefaultStyles";
import { Image } from 'react-native';
import { AutenticacaoContext } from '../../../../../Contexts/UserContext.js';
import ModalComponent from "../../../../../Components/Modal";

const ModalPerfilSettings = ({ state, setModalInformation }) => {
    const { username } = useContext(AutenticacaoContext);

    return (
        <ModalComponent visible={state} setModalVisible={setModalInformation} upKeyboard={true}>
            <UppercaseTitle>{`Atenção aos prazos, ${username}!`}</UppercaseTitle>
            <TextTitle>Cards com cores?</TextTitle>

            <TextModal>Utilizamos o sistema de cores ao redor dos cards para lembrar você dos seus afazeres. Essas são as nossas legendas:</TextModal>
            <TextColorsModal>
                Bordas Verdes: Tarefas concluídas.
            </TextColorsModal>

            <TextColorsModal>
                Bordas Azuis-celestes: Tarefas pendentes.
            </TextColorsModal>

            <TextColorsModal>
                Bordas Vermelhas: Tarefas atrasadas.
            </TextColorsModal>
            <Image
                source={require('./Modal-Image.png')}
                style={{ width: "100%", height: "50%" }}
                resizeMode="cover"
            />
        </ModalComponent>
    )
}

export default ModalPerfilSettings;