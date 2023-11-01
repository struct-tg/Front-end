import React from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ContentContainer, ViewContainer, ContainerButton } from "../../../../../Styles/DefaultStyles";
import { Input } from "../../../../../Components/Inputs";
import { Button } from "../../../../../Components/Button";
import HelperTextComponent from "../../../../../Components/HelperText";
import DropdownComponent from "../../../../../Components/DropDown";

const FormsActivity = ({ aoSubmitar, isEdit, initialValues, interactions }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

    const data = [
        { label: 'Prova', value: 1 },
        { label: 'Atividade avaliativa', value: 2 },
        { label: 'Trabalho', value: 3 },
    ]

    const disciplinas = [
        { label: 'LBD', value: 1 },
        { label: 'ED', value: 2 },
        { label: 'Banco de dados', value: 3 },
    ]

    const handleConfirm = (data) => {
        console.log(data);
    }

    return (
        <ContentContainer>
            <ViewContainer>
                <Controller
                    control={control}
                    name='name'
                    defaultValue=""
                    rules={{ required: 'Campo obrigatório!', maxLength: { value: 25, message: "Nome muito grande!" }, minLength: { value: 3, message: "Nome muito pequeno" } }}
                    render={({ field }) => (
                        <View>
                            <Input
                                text={'Nome da tarefa: '}
                                onChangeText={field.onChange}
                                value={field.value}
                            />
                            {errors.name && (<HelperTextComponent helperType="error" helperText={errors.name.message} />)}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="disciplineId"
                    defaultValue={null}
                    render={({ field }) => (
                        <DropdownComponent
                            state={field.value}
                            fnSetValue={field.onChange}
                            text={'Selecione a disciplina: '}
                            arrObjInformation={disciplinas}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="typeAc"
                    defaultValue={null}
                    render={({ field }) => (
                        <DropdownComponent
                            state={field.value}
                            fnSetValue={field.onChange}
                            text={'Tipo de atividade avaliativa: '}
                            arrObjInformation={data}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='note'
                    defaultValue=""
                    rules={{ required: 'Campo obrigatório!' }}
                    render={({ field }) => (
                        <View>
                            <Input
                                text={'Nota da atividade: '}
                                onChangeText={field.onChange}
                                value={field.value}
                            />
                            {errors.note && (<HelperTextComponent helperType="error" helperText={errors.note.message} />)}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name='weight'
                    defaultValue=""
                    rules={{ required: 'Campo obrigatório!' }}
                    render={({ field }) => (
                        <View>
                            <Input
                                text={'Peso da atividade: '}
                                onChangeText={field.onChange}
                                value={field.value}
                            />
                            {errors.weight && (<HelperTextComponent helperType="error" helperText={errors.weight.message} />)}
                        </View>
                    )}
                />

                <ContainerButton>
                    <Button
                        text="Salvar atividade."
                    />
                </ContainerButton>
            </ViewContainer>
        </ContentContainer>
    );
}

export default FormsActivity;