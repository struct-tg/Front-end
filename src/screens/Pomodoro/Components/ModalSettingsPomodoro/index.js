import React from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../../../../Components/Button";
import { Input } from "../../../../Components/Inputs";
import { ContainerButton, UppercaseTitle } from "../../../../Styles/DefaultStyles";
import {
    ModalSectionInput,
    ModalSectionRow,
    ModalSectionValue,
    ModalTitleInput,
    ModalTextPomodoroSettings,
    ModalInputRow
} from "./StylesPomodoroSettings.js";
import HelperTextComponent from "../../../../Components/HelperText";
import SwitchComponent from "../../../../Components/Switch";
import ModalComponent from "../../../../Components/Modal";

const ModalPomodoroSettings = ({ state, setModalVisible }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log(data);
        setModalVisible(false);
    }

    return (
        <ModalComponent visible={state} setModalVisible={setModalVisible} upKeyboard={true}>
            <UppercaseTitle>Configure seu ciclo.</UppercaseTitle>

            <ModalSectionInput>
                <ModalSectionValue>
                    <ModalTitleInput>Pomodoro</ModalTitleInput>
                    <Controller
                        control={control}
                        name="timePomodoro"
                        rules={{ required: 'Campo obrigatório' }}
                        defaultValue=""
                        render={({ field }) => (
                            <View>
                                <Input
                                    value={String(field.value)}
                                    onChangeText={field.onChange}
                                />
                                {errors.timePomodoro && (<HelperTextComponent helperType="error" helperText={errors.timePomodoro.message} />)}
                            </View>
                        )}
                    />
                </ModalSectionValue>

                <ModalSectionValue>
                    <ModalTitleInput>Pausa curta</ModalTitleInput>
                    <Controller
                        control={control}
                        name="pausaCurta"
                        rules={{ required: 'Campo obrigatório' }}
                        defaultValue=""
                        render={({ field }) => (
                            <View>
                                <Input
                                    value={String(field.value)}
                                    onChangeText={field.onChange}
                                />
                                {errors.pausaCurta && (<HelperTextComponent helperType="error" helperText={errors.pausaCurta.message} />)}
                            </View>
                        )}
                    />
                </ModalSectionValue>

                <ModalSectionValue>
                    <ModalTitleInput>Pausa longa</ModalTitleInput>
                    <Controller
                        control={control}
                        name="pausaLonga"
                        rules={{ required: 'Campo obrigatório' }}
                        defaultValue=""
                        render={({ field }) => (
                            <View>
                                <Input
                                    value={String(field.value)}
                                    onChangeText={field.onChange}
                                />
                                {errors.pausaLonga && (<HelperTextComponent helperType="error" helperText={errors.pausaLonga.message} />)}
                            </View>
                        )}
                    />
                </ModalSectionValue>
            </ModalSectionInput>

            <ModalSectionRow>
                <ModalTextPomodoroSettings>Iniciar automaticamente as pausas</ModalTextPomodoroSettings>
                <Controller
                    control={control}
                    name="iniciarAutoticamentePausas"
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
                    name="iniciarAutoticamentePomodoro"
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
                        name="qtdePausasLongas"
                        rules={{ required: 'Campo obrigatório' }}
                        defaultValue=""
                        render={({ field }) => (
                            <View>
                                <Input
                                    value={String(field.value)}
                                    onChangeText={field.onChange}
                                />
                                {errors.qtdePausasLongas && (<HelperTextComponent helperType="error" helperText={errors.qtdePausasLongas.message} />)}
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