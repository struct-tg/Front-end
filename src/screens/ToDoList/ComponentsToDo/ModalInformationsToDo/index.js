import React from 'react'
import { TextTitle, TextModal, TextColorsModal } from "./StylesModalInformations.js";
import { UppercaseTitle } from "../../../../Styles/DefaultStyles";
import { Image } from 'react-native';
import ModalComponent from "../../../../Components/Modal";

const ModalPerfilSettings = ({ state, setModalInformation }) => {
    return (
        <ModalComponent visible={state} setModalVisible={setModalInformation} upKeyboard={true}>
            <UppercaseTitle>Atenção aos prazos, Estudantes!</UppercaseTitle>
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
                source={require('./Modal-Information.png')}
                style={{ width: "100%", height: "50%" }}
                resizeMode="cover"
            />
        </ModalComponent>
    )
}

export default ModalPerfilSettings;