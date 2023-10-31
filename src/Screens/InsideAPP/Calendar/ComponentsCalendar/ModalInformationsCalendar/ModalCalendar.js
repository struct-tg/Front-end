import React from 'react';
import {
    UppercaseTitle,
    TextModal,
    ViewContainer
} from "../../../../../Styles/DefaultStyles";
import ModalComponent from "../../../../../Components/Modal";

const ModalInformationCalendar = ({ state, setModalInformation }) => {
    return (
        <ModalComponent visible={state} setModalVisible={setModalInformation} upKeyboard={true}>
            <UppercaseTitle>Como identificar o tipo de atividade avaliativa?</UppercaseTitle>
            <ViewContainer>
                <TextModal>
                    PROVA
                </TextModal>

                <TextModal>
                    ATIVIDADES
                </TextModal>

                <TextModal>
                    TRABALHOS
                </TextModal>
            </ViewContainer>
        </ModalComponent>
    )
}

export default ModalInformationCalendar