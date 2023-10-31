import React from 'react'
import { Image } from 'react-native';
import { TextTitle, TextColorsModal } from "./StylesModalInformations.js";
import { UppercaseTitle, TextModal } from "../../../../../Styles/DefaultStyles";
import ModalComponent from "../../../../../Components/Modal";
import useMocks from '../../../../../Mocks/index.js';

const ModalPerfilSettings = ({ state, setModalInformation }) => {
    const { ToDoMocks } = useMocks();

    return (
        <ModalComponent visible={state} setModalVisible={setModalInformation} upKeyboard={true}>
            <UppercaseTitle>{ToDoMocks.ToDoScreen.modal.uppercaseTitle}</UppercaseTitle>

            <TextTitle>{ToDoMocks.ToDoScreen.modal.title}</TextTitle>
            <TextModal>{ToDoMocks.ToDoScreen.modal.texto}</TextModal>

            <TextColorsModal>{ToDoMocks.ToDoScreen.modal.legend.concluida}</TextColorsModal>
            <TextColorsModal>{ToDoMocks.ToDoScreen.modal.legend.pendente}</TextColorsModal>
            <TextColorsModal>{ToDoMocks.ToDoScreen.modal.legend.atrasada}</TextColorsModal>

            <Image
                source={ToDoMocks.ToDoScreen.modal.image.content}
                style={{ width: '100%', height: '50%' }}
                resizeMode={ToDoMocks.ToDoScreen.modal.image.rezide}
            />
        </ModalComponent>
    )
}

export default ModalPerfilSettings;