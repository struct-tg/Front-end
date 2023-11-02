import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from "@react-navigation/native";


import { Input } from "../../../../../../../Components/Inputs";
import { Button } from "../../../../../../../Components/Button";
import { ContainerButton } from "../../../../../../../Styles/DefaultStyles";
import { getAllNamesDiscipline } from "../../../../../../../Services/Requisicoes/Grades/Filters";
import { AutenticacaoContext } from "../../../../../../../Contexts/UserContext";
import TextArea from "../../../../../../../Components/TextArea";
import DropdownComponent from "../../../../../../../Components/DropDown";
import Calendar from '../CalendarAvtivity/Calendar-activity';
import HelperTextComponent from "../../../../../../../Components/HelperText";

const FormsActivity = ({ aoSubmitar, initialValues, isEdit, interactions }) => {
    const { tokenJWT } = useContext(AutenticacaoContext);
    const [namesDisciplines, setNamesDisciplines] = useState([]);
    const isFocused = useIsFocused();
    const [calendarVisible, setCalendarVisible] = useState(false);


    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: {
            discipline: isEdit ? String(initialValues.discipline) : "",
            nameActivity: isEdit ? String(initialValues.nameActivity) : "",
            typeAc: isEdit ? String(initialValues.typeAc) : "",
            date: isEdit ? String(initialValues.date) : "",
            weight: isEdit ? String(initialValues.weight.toFixed(2)) : null,
            note: isEdit ? String(initialValues.note.toFixed(2)) : null,
            comment: isEdit ? String(initialValues.comment) : "",
            description: isEdit ? String(initialValues.description) : ""
        }
    });

    useEffect(() => {
        async function fetchNamesDisciplines() {
            const result = await getAllNamesDiscipline(tokenJWT)
            if (result) {
                const data = result.map(item => ({
                    label: item.name,
                    value: item.disciplineId
                }));
                setNamesDisciplines(data)
            }
        }
        fetchNamesDisciplines()
    }, [isFocused])

    const onSubmit = (data) => {
        const formData = {
            ...data
        };
        aoSubmitar(formData);
    }

    const data = [
        { label: 'Prova', value: 1 },
        { label: 'Trabalho', value: 2 },
        { label: 'Atividade', value: 3 }
    ]

    return (
        <SafeAreaView style={{ backgroundColor: '#40aab8', flexGrow: 1, justifyContent: 'space-around', paddingHorizontal: 20 }}>
            <Controller
                control={control}
                name="discipline"
                defaultValue={null}
                render={({ field }) => (
                    <View>
                        <DropdownComponent
                            state={field.value}
                            fnSetValue={field.onChange}
                            text={"Associe a uma disciplina."}
                            arrObjInformation={namesDisciplines}
                        />
                        {errors.discipline && (
                            <HelperTextComponent helperType={'error'} helperText={errors.discipline.message} />
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name='nameActivity'
                rules={{ required: "Campo obrigatório!", maxLength: { value: 20, message: "Nome muito grande!" }, minLength: { value: 3, message: "Nome muito pequeno" } }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Nome da Atividade: '}
                            disabled={isEdit === true}
                            secureText={false}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.nameActivity && (
                            <HelperTextComponent helperType={'error'} helperText={errors.nameActivity.message} />
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="typeAc"
                defaultValue={null}
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                    <View>
                        <DropdownComponent
                            state={field.value}
                            fnSetValue={field.onChange}
                            text={"Tipo de Atividade: "}
                            arrObjInformation={data}
                        />
                        {errors.typeAc && (
                            <HelperTextComponent helperType="error" helperText={errors.typeAc.message} />)}
                    </View>
                )}
            />

            <Controller
                control={control}
                name='date'
                rules={{ required: "Campo obrigatório!" }}
                render={({ field }) => (
                    <View>
                        <Calendar
                            state={calendarVisible}
                            setCalendarVisible={setCalendarVisible}
                            data={field.value}
                            setData={(newValue) => field.onChange(newValue)}
                            disabled={isEdit === true}
                            interactions={interactions}
                        />
                        {errors.date && (
                            <HelperTextComponent helperType={'error'} helperText={errors.date.message} />
                        )}
                    </View>
                )}
            />
            <Controller
                control={control}
                name='weight'
                rules={{ required: "Campo obrigatório!", maxLength: { value: 1 }, minLength: { value: 6 } }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Peso da Atividade: '}
                            disabled={isEdit === true}
                            secureText={false}
                            type={'numeric'}
                            value={field.value}
                            onChangeText={field.onChange}
                            formatNumber={true}
                        />
                        {errors.weight && (
                            <HelperTextComponent helperType={'error'} helperText={errors.weight.message} />
                        )}
                    </View>
                )}
            />
            <Controller
                control={control}
                name='note'
                rules={{ required: "Campo obrigatório!", maxLength: { value: 1 }, minLength: { value: 6 } }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Nota da Atividade: '}
                            disabled={isEdit === true}
                            secureText={false}
                            type={'numeric'}
                            value={field.value}
                            onChangeText={field.onChange}
                            formatNumber={true}
                        />
                        {errors.note && (
                            <HelperTextComponent helperType={'error'} helperText={errors.note.message} />
                        )}
                    </View>
                )}
            />
            <Controller
                control={control}
                name='comment'
                rules={{ maxLength: { value: 500, message: "Nome muito grande!" } }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Comentário: '}
                            disabled={isEdit === true}
                            secureText={false}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.comment && (
                            <HelperTextComponent helperType={'error'} helperText={errors.comment.message} />
                        )}
                    </View>
                )}
            />
            <Controller
                control={control}
                name='description'
                rules={{ maxLength: { value: 1000, message: "Nome muito grande!" } }}
                render={({ field }) => (
                    <View>
                        <TextArea
                            text={"Descricação da tarefa: "}
                            value={field.value}
                            onChangeText={field.onChange}
                            disabled={isEdit === true}
                        />
                        {errors.description && (
                            <HelperTextComponent helperType={'error'} helperText={errors.description.message} />
                        )}
                    </View>
                )}
            />

            {!interactions
                &&
                (<ContainerButton>
                    <Button
                        text={'Salvar atividade.'}
                        onPress={handleSubmit(onSubmit)}
                    />
                </ContainerButton>
                )
            }
        </SafeAreaView>
    )
};

export default FormsActivity;