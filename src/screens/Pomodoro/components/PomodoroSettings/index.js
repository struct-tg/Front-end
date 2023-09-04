import React, { useState } from "react";
import SwitchComponent from "../../../../Components/Switch";
import ModalComponent from "../../../../Components/Modal";
import { Button } from "../../../../Components/Button";
import { Input } from "../../../../Components/Inputs";
import { ContainerButton, UppercaseTitle } from "../../../../styles/DefaultStyles";
import {
    ModalSectionInput,
    ModalSectionRow,
    ModalSectionValue,
    ModalTitleInput,
    ModalTextPomodoroSettings,
    ModalInputRow
} from "./StylesPomodoroSettings.js";

const ModalPomodoroSettings = ({ state, setModalVisible }) => {
    const [stateIniciarAutomaticamentePausas, setStateIniciarAutomaticamentePausas] = useState(false);
    const [stateIniciarAutomaticamentePomodoro, setStateIniciarAutomaticamentePomodoro] = useState(false);

    const initialDatas = {
        timePomodoro: 0,
        pausaCurta: 0,
        pausaLonga: 0,
        iniciarAutomaticamentePausas: stateIniciarAutomaticamentePausas,
        iniciarAutomaticamentePomodoro: stateIniciarAutomaticamentePomodoro,
        qtdePausasLongas: 0
    };
    const [configPomodoro, setConfigPomodoro] = useState(initialDatas);

    const handleSalvar = () => {
        console.log("Valores do formulário:", configPomodoro);
        setModalVisible(false);
    };

    return (
        <ModalComponent visible={state} setModalVisible={setModalVisible} upKeyboard={true}>
            <UppercaseTitle>Configure seu ciclo.</UppercaseTitle>

            <ModalSectionInput>
                <ModalSectionValue>
                    <ModalTitleInput>Pomodoro</ModalTitleInput>
                    <Input
                        value={String(configPomodoro.timePomodoro)}
                        onChangeText={(text) => setConfigPomodoro({ ...configPomodoro, timePomodoro: text })}
                    />
                </ModalSectionValue>

                <ModalSectionValue>
                    <ModalTitleInput>Pausa curta</ModalTitleInput>
                    <Input
                        value={String(configPomodoro.pausaCurta)}
                        onChangeText={(text) => setConfigPomodoro({ ...configPomodoro, pausaCurta: text })}
                    />
                </ModalSectionValue>

                <ModalSectionValue>
                    <ModalTitleInput>Pausa longa</ModalTitleInput>
                    <Input
                        value={String(configPomodoro.pausaLonga)}
                        onChangeText={(text) => setConfigPomodoro({ ...configPomodoro, pausaLonga: text })}
                    />
                </ModalSectionValue>
            </ModalSectionInput>

            <ModalSectionRow>
                <ModalTextPomodoroSettings>Iniciar automaticamente as pausas</ModalTextPomodoroSettings>
                <SwitchComponent
                    value={stateIniciarAutomaticamentePausas}
                    onValueChange={(value) => {
                        setStateIniciarAutomaticamentePausas(value);
                        setConfigPomodoro({ ...configPomodoro, iniciarAutomaticamentePausas: value });
                    }}

                />
            </ModalSectionRow>

            <ModalSectionRow>
                <ModalTextPomodoroSettings>Iniciar automaticamente o pomodoro</ModalTextPomodoroSettings>
                <SwitchComponent
                    value={stateIniciarAutomaticamentePomodoro}
                    onValueChange={(value) => {
                        setStateIniciarAutomaticamentePomodoro(value);
                        setConfigPomodoro({ ...configPomodoro, iniciarAutomaticamentePomodoro: value });
                    }}
                />
            </ModalSectionRow>

            <ModalSectionRow>
                <ModalTextPomodoroSettings>Quantidade de pausas longas</ModalTextPomodoroSettings>
                <ModalInputRow>
                    <Input
                        value={String(configPomodoro.qtdePausasLongas)}
                        onChangeText={(text) => setConfigPomodoro({ ...configPomodoro, qtdePausasLongas: text })}
                    />
                </ModalInputRow>

            </ModalSectionRow>

            <ContainerButton>
                <Button
                    text={"Salvar"}
                    onPress={handleSalvar}
                />
            </ContainerButton>
        </ModalComponent>
    )
}

export default ModalPomodoroSettings;