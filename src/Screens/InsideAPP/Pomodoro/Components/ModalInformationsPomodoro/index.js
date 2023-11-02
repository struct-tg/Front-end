import React from 'react';
import { Image } from 'react-native';
import {
    UppercaseTitle,
    TextModal,
    ContainerImageInitial,
    ViewContainer
} from "../../../../../Styles/DefaultStyles";
import ModalComponent from "../../../../../Components/Modal";

const ModalInformationPomodoro = ({ state, setModalInformation }) => {
    return (
        <ModalComponent visible={state} setModalVisible={setModalInformation} upKeyboard={true}>
            <UppercaseTitle>Como funciona o sistema Pomodoro?</UppercaseTitle>
            <ViewContainer>
                <TextModal>
                    Você pode personalizar os seus próprios ciclos, escolhendo os tempos de Pomodoro, pausas curtas e pausas longas, além disso, é possivel determinar quando será aplicado a sua pausa longa.
                </TextModal>

                <TextModal>
                    Um ciclo é definido como um tempo de Pomodoro e, após isso, uma pausa curta. Esta abordagem estruturada permite otimizar sua performance durante os estudos, promovendo uma melhor concentração e produtividade.
                </TextModal>

                <ContainerImageInitial>
                    <Image
                        source={require('./ModalPomodoro-Image.png')}
                        style={{ width: "100%", height: "40%" }}
                        resizeMode="cover"
                    />
                </ContainerImageInitial>
            </ViewContainer>
        </ModalComponent>
    )
}

export default ModalInformationPomodoro