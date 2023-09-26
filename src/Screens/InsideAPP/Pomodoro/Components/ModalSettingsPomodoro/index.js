import React, { useContext } from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../../../../../Components/Button";
import { Input } from "../../../../../Components/Inputs";
import { ContainerButton, UppercaseTitle } from "../../../../../Styles/DefaultStyles";
import { createPomodoro } from "../../../../../Services/Requisicoes/Pomodoro";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import {
    ModalSectionInput,
    ModalSectionRow,
    ModalSectionValue,
    ModalTitleInput,
    ModalTextPomodoroSettings,
    ModalInputRow
} from "./StylesPomodoroSettings.js";
import HelperTextComponent from "../../../../../Components/HelperText";
import SwitchComponent from "../../../../../Components/Switch";
import ModalComponent from "../../../../../Components/Modal";

const ModalPomodoroSettings = ({ state, setModalVisible }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const { tokenJWT } = useContext(AutenticacaoContext);

    const onSubmit = async (data) => {
        data.timer = parseInt(data.timer);
        data.timerPauseShort = parseInt(data.timerPauseShort);
        data.timerPauseLong = parseInt(data.timerPauseLong);
        data.quantityPauseLong = parseInt(data.quantityPauseLong);

        const result = await createPomodoro(data, tokenJWT);
        if (result) {
            setModalVisible(false);
            console.log('DADOS ENVIADOS: ', data);
        } else {
            console.log('deu erro truta');
        }
    }

    return (
        <ModalComponent visible={state} setModalVisible={setModalVisible} upKeyboard={true}>
            <UppercaseTitle>Configure seu ciclo.</UppercaseTitle>

            <ModalSectionInput>
                <ModalSectionValue>
                    <ModalTitleInput>Pomodoro</ModalTitleInput>
                    <Controller
                        control={control}
                        name="timer"
                        rules={{ required: 'Campo obrigatório' }}
                        defaultValue=""
                        render={({ field }) => (
                            <View>
                                <Input
                                    value={String(field.value)}
                                    onChangeText={field.onChange}
                                />
                                {errors.timer && (<HelperTextComponent helperType="error" helperText={errors.timer.message} />)}
                            </View>
                        )}
                    />
                </ModalSectionValue>

                <ModalSectionValue>
                    <ModalTitleInput>Pausa curta</ModalTitleInput>
                    <Controller
                        control={control}
                        name="timerPauseShort"
                        rules={{ required: 'Campo obrigatório' }}
                        defaultValue=""
                        render={({ field }) => (
                            <View>
                                <Input
                                    value={String(field.value)}
                                    onChangeText={field.onChange}
                                />
                                {errors.timerPauseShort && (<HelperTextComponent helperType="error" helperText={errors.timerPauseShort.message} />)}
                            </View>
                        )}
                    />
                </ModalSectionValue>

                <ModalSectionValue>
                    <ModalTitleInput>Pausa longa</ModalTitleInput>
                    <Controller
                        control={control}
                        name="timerPauseLong"
                        rules={{ required: 'Campo obrigatório' }}
                        defaultValue=""
                        render={({ field }) => (
                            <View>
                                <Input
                                    value={String(field.value)}
                                    onChangeText={field.onChange}
                                />
                                {errors.timerPauseLong && (<HelperTextComponent helperType="error" helperText={errors.timerPauseLong.message} />)}
                            </View>
                        )}
                    />
                </ModalSectionValue>
            </ModalSectionInput>

            <ModalSectionRow>
                <ModalTextPomodoroSettings>Iniciar automaticamente as pausas</ModalTextPomodoroSettings>
                <Controller
                    control={control}
                    name="startAutomaticPause"
                    defaultValue={false}
                    render={({ field }) => (
                        <SwitchComponent
                            value={field.value}
                            onValueChange={field.onChange}
                        />
                    )}
                />
            </ModalSectionRow>

            <ModalSectionRow>
                <ModalTextPomodoroSettings>Iniciar automaticamente o pomodoro</ModalTextPomodoroSettings>
                <Controller
                    control={control}
                    name="startAutomaticTimer"
                    defaultValue={false}
                    render={({ field }) => (
                        <SwitchComponent
                            value={field.value}
                            onValueChange={field.onChange}
                        />
                    )}
                />
            </ModalSectionRow>

            <ModalSectionRow>
                <ModalTextPomodoroSettings>Quantidade de pausas longas</ModalTextPomodoroSettings>
                <ModalInputRow>
                    <Controller
                        control={control}
                        name="quantityPauseLong"
                        rules={{ required: 'Campo obrigatório' }}
                        defaultValue=""
                        render={({ field }) => (
                            <View>
                                <Input
                                    value={String(field.value)}
                                    onChangeText={field.onChange}
                                />
                                {errors.quantityPauseLong && (<HelperTextComponent helperType="error" helperText={errors.quantityPauseLong.message} />)}
                            </View>
                        )}
                    />
                </ModalInputRow>

            </ModalSectionRow>

            <ContainerButton>
                <Button
                    text={"Salvar"}
                    onPress={handleSubmit(onSubmit)}
                />
            </ContainerButton>
        </ModalComponent>
    )
}

export default ModalPomodoroSettings;