import React from 'react';
import { Input } from "../../../../../Components/Inputs";
import { Button } from "../../../../../Components/Button";
import { View } from 'react-native';
import { ContentContainer, ViewContainer, ContainerButton, InlineTextSwitch, Text } from "../../../../../Styles/DefaultStyles";
import { Controller, useForm } from 'react-hook-form';
import DropdownComponent from '../../../../../Components/DropDown';
import SwitchComponent from "../../../../../Components/Switch";
import HelperTextComponent from "../../../../../Components/HelperText";

const FormsPomodoro = ({ aoSubmitar, initialValues, isEdit }) => {
    const { control, formState: { errors }, handleSubmit } = useForm({ mode: "onChange", defaultValues: initialValues })

    const onSubmit = async (data) => {
        data.timer = parseInt(data.timer);
        data.timerPauseShort = parseInt(data.timerPauseShort);
        data.timerPauseLong = parseInt(data.timerPauseLong);
        data.quantityPauseLong = parseInt(data.quantityPauseLong);

        aoSubmitar(data);
    }

    const data = [
        { label: 'Ciclo 1', value: 1 },
        { label: 'Ciclo 2', value: 2 },
        { label: 'Ciclo 3', value: 3 },
        { label: 'Ciclo 4', value: 4 },
        { label: 'Ciclo 5', value: 5 }
    ]

    return (
        <ContentContainer>
            <ViewContainer>
                <Controller
                    control={control}
                    name="timer"
                    rules={{ required: 'Campo obrigatório' }}
                    defaultValue=""
                    render={({ field }) => (
                        <View>
                            <Input
                                text={"Tempo de Pomodoro (Minutos): "}
                                value={String(field.value)}
                                onChangeText={field.onChange}
                                type={'numeric'}
                                formatPomodoro={true}
                            />
                            {errors.timer && (<HelperTextComponent helperType="error" helperText={errors.timer.message} />)}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="timerPauseShort"
                    rules={{ required: 'Campo obrigatório' }}
                    defaultValue=""
                    render={({ field }) => (
                        <View>
                            <Input
                                text={"Tempo de pausa curta (Minutos): "}
                                value={String(field.value)}
                                onChangeText={field.onChange}
                                type={'numeric'}
                                formatPomodoro={true}
                            />
                            {errors.timerPauseShort && (<HelperTextComponent helperType="error" helperText={errors.timerPauseShort.message} />)}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="timerPauseLong"
                    rules={{ required: 'Campo obrigatório' }}
                    defaultValue=""
                    render={({ field }) => (
                        <View>
                            <Input
                                text={"Tempo de pausa longa (Minutos): "}
                                value={String(field.value)}
                                onChangeText={field.onChange}
                                type={'numeric'}
                                formatPomodoro={true}
                            />
                            {errors.timerPauseLong && (<HelperTextComponent helperType="error" helperText={errors.timerPauseLong.message} />)}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="quantityPauseLong"
                    defaultValue={null}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <View>
                            <DropdownComponent
                                state={field.value}
                                fnSetValue={field.onChange}
                                text={"Quando aplicar a pausa longa ?"}
                                arrObjInformation={data}
                            />
                            {errors.quantityPauseLong && (<HelperTextComponent helperType="error" helperText={errors.quantityPauseLong.message} />)}
                        </View>
                    )}
                />

                <InlineTextSwitch>
                    <Text>Iniciar automaticamente os intervalos: </Text>
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
                </InlineTextSwitch>

                <InlineTextSwitch>
                    <Text>Iniciar automaticamente o pomodoro: </Text>
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
                </InlineTextSwitch>

                <ContainerButton>
                    <Button
                        text={"Salvar Pomodoro."}
                        onPress={handleSubmit(onSubmit)}
                    />
                </ContainerButton>
            </ViewContainer>
        </ContentContainer>
    )
}

export default FormsPomodoro;