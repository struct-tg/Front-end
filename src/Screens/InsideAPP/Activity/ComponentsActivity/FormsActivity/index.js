import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ContentContainer, ContainerButton } from "../../../../../Styles/DefaultStyles";
import { Input } from "../../../../../Components/Inputs";
import { Button } from "../../../../../Components/Button";
import { getAllNamesDiscipline } from "../../../../../Services/Requests/Disciplines/Filters/index.js";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext.js";
import { useIsFocused } from "@react-navigation/native";
import { convertDateISO8601, convertISODateToTraceDateString } from "../../../../../Utils/Date/index.js";
import ToastComponent from "../../../../../Components/Toast/index.js";
import Calendar from "../../../../../Components/Calendar/index.js";
import HelperTextComponent from "../../../../../Components/HelperText";
import DropdownComponent from "../../../../../Components/DropDown";

const FormsActivity = ({ aoSubmitar, typeCalc, isEdit, initialValues, interactions, isFinishedDiscipline }) => {
    const { tokenJWT } = useContext(AutenticacaoContext);
    const [namesDisciplines, setNamesDisciplines] = useState([]);
    const [dateError, setDateError] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const isFocused = useIsFocused();
    const typeActivities = [{ label: 'Prova', value: 'EXAMINATION' }, { label: 'Atividade', value: 'ACTIVITY' }, { label: 'Trabalho', value: 'WORK' }];
    
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: {
            name: isEdit ? initialValues.name : "",
            date: isEdit ? convertDateISO8601(initialValues.date) : "",
            disciplineId: isEdit ? initialValues.disciplineId : "",
            typeAc: isEdit ? initialValues.typeAc : "",
            note: isEdit ? String(initialValues.note.toFixed(2)) : "",
            weight: isEdit ? String(initialValues.weight.toFixed(2)) : ""
        }
    });

    useEffect(() => {
        async function fetchNamesDisciplines() {
            const result = await getAllNamesDiscipline(tokenJWT);
            if (result) {
                const data = result.map(item => ({ label: item.name, value: item.disciplineId }));
                setNamesDisciplines(data)
            }
        }
        fetchNamesDisciplines()
    }, [isFocused])

    const convertDate = (dateString) => {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month}-${day}`;
        }
        return dateString;
    }

    const fnSubmit = (objEnvio) => {
        objEnvio.date = convertDate(objEnvio.date);
        objEnvio.note = parseFloat(objEnvio.note);
        objEnvio.comment = null;
        objEnvio.description = null;

        const selectedDate = objEnvio.date;
        const currentDateFormatada = convertISODateToTraceDateString(currentDate);

        if (typeCalc === 'SIMPLE') {
            delete objEnvio.weight;
        } else {
            objEnvio.weight = parseFloat(objEnvio.weight);
        }

        if (selectedDate < currentDateFormatada) {
            setDateError(true);
            setToastVisible(true);
        } else {
            aoSubmitar(objEnvio);
        }
    }

    return (
        <ContentContainer>
            <View style={{ flexGrow: 1, justifyContent: 'space-around' }}>
                <Controller
                    control={control}
                    name='name'
                    defaultValue=""
                    rules={{ required: 'Campo obrigatório!', maxLength: { value: 25, message: "Nome muito grande!" }, minLength: { value: 3, message: "Nome muito pequeno" } }}
                    render={({ field }) => (
                        <View>
                            <Input
                                text={'Nome da atividade: '}
                                onChangeText={field.onChange}
                                value={field.value}
                                disabled={isEdit === true && isFinishedDiscipline === true}
                            />
                            {errors.name && (<HelperTextComponent helperType="error" helperText={errors.name.message} />)}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name='date'
                    defaultValue={""}
                    rules={{ required: 'Campo obrigatório!' }}
                    render={({ field }) => (
                        <View>
                            <Calendar
                                state={calendarVisible}
                                setCalendarVisible={setCalendarVisible}
                                data={field.value}
                                setData={(newValue) => field.onChange(newValue)}
                                disabled={isEdit === true && isFinishedDiscipline}
                                interactions={interactions}
                            />
                            {errors.date && (<HelperTextComponent helperType={'error'} helperText={errors.date.message} />)}
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
                            arrObjInformation={namesDisciplines}
                            disable={isEdit === true && isFinishedDiscipline === true}
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
                            text={'Tipo de atividade: '}
                            arrObjInformation={typeActivities}
                            disable={isEdit === true && isFinishedDiscipline === true}
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
                                formatNumber={true}
                                disabled={isEdit === true && isFinishedDiscipline === true}
                            />
                            {errors.note && (<HelperTextComponent helperType="error" helperText={errors.note.message} />)}
                        </View>
                    )}
                />
                {typeCalc !== 'SIMPLE'
                    &&
                    (<Controller
                        control={control}
                        name='weight'
                        defaultValue=""
                        rules={{ required: 'Campo obrigatório!' }}
                        render={({ field }) => (
                            <View>
                                <Input
                                    text={'Peso da atividade (%): '}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    formatNumber={true}
                                    disabled={isEdit === true && isFinishedDiscipline === true}
                                />
                                {errors.weight && (<HelperTextComponent helperType="error" helperText={errors.weight.message} />)}
                            </View>
                        )}
                    />
                    )
                }

                {interactions && (
                    <ContainerButton>
                        <Button
                            text={"Salvar atividade."}
                            onPress={handleSubmit(fnSubmit)}
                        />
                    </ContainerButton>
                )

                }

                {toastVisible && (
                    <ToastComponent
                        ToastType={'error'}
                        Title={'Data inválida!'}
                        Description={'Insira uma data valida, Estudante!'}
                    />
                )}
            </View>
        </ContentContainer>
    );
}

export default FormsActivity;