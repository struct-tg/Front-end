import React, { useState, useEffect, useContext } from 'react';
import { DateTime } from 'luxon';
import { View } from 'react-native';
import { ContentContainer, ViewContainer } from "../../../../../Styles/DefaultStyles/index";
import { useForm, Controller } from 'react-hook-form';
import { InputForm } from '../../../../../Components/Inputs';
import { ContainerButton } from '../../../../../Styles/DefaultStyles';
import { Button } from '../../../../../Components/Button';
import { convertDateISO8601, convertISODateToSlashDateString, convertISODateToTraceDateString } from '../../../../../Utils/Date/index';
import { getAllNamesDiscipline } from "../../../../../Services/Requests/Disciplines/Filters";
import { useIsFocused } from '@react-navigation/native';
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import ToastComponent from "../../../../../Components/Toast";
import TextArea from "../../../../../Components/TextArea";
import ScrollBlock from '../ScrollBlockToDo';
import HelperTextComponent from "../../../../../Components/HelperText";
import Calendar from '../CalendarToDo';
import DropdownComponent from '../../../../../Components/DropDown';

const FormsToDo = ({ aoSubmitar, initialValues, isEdit, interactions }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", defaultValues: initialValues });
    const [subTasks, setSubtasks] = useState(isEdit ? initialValues.subTasks || [] : [] || initialValues.subTasks);
    const [namesDisciplines, setNamesDisciplines] = useState([]);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [toastVisible, setToastVisible] = useState(false);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const isFocused = useIsFocused();

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

    const fnAddNewInput = (ID) => {
        const newSubtask = {
            id: ID,
            description: "",
            status: false,
        }
        setSubtasks((prevSubtasks) => [...prevSubtasks, newSubtask]);
    };

    const fnRemoveInput = (inputId) => {
        setSubtasks((prevSubtasks) =>
            prevSubtasks.filter((subtask) => subtask.id !== inputId)
        );
    };

    const fnFinishTask = (inputId, item) => {
        setSubtasks((prevSubtasks) => {
            const updatedSubtasks = prevSubtasks.map((subtask) =>
                subtask.id === inputId ? { ...subtask, status: !subtask.status } : subtask
            );
            return updatedSubtasks;
        });
    };

    const fnChangeText = (inputId, inputText) => {
        setSubtasks((prevSubtasks) => {
            const updatedSubtasks = prevSubtasks.map((subtask) =>
                subtask.id === inputId ? { ...subtask, description: inputText } : subtask
            );
            return updatedSubtasks;
        });
    }

    const convertDate = (dateString) => {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month}-${day}`;
        }
        return dateString;
    }

    const removeEmptyDescriptionSubTasks = (subTasks) => {
        const filteredSubTasks = subTasks.filter(subtask => subtask.description !== "");
        return filteredSubTasks;
    }

    const fnSubmit = (data) => {
        const subTasksWithoutId = subTasks.map(({ id, ...rest }) => rest);
        const enviaSubTasks = removeEmptyDescriptionSubTasks(subTasksWithoutId);
        const objEnvio = { ...data, subTasks: enviaSubTasks };

        objEnvio.dateWishEnd = convertDate(objEnvio.dateWishEnd);

        const selectedDate = objEnvio.dateWishEnd;
        const currentDateFormatada = convertISODateToTraceDateString(currentDate);

        if (selectedDate < currentDateFormatada) {
            setDateError(true);
            setToastVisible(true);

            setToastVisible(false);
        } else {
            aoSubmitar(objEnvio);
        }
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
                            <InputForm
                                text={"Nome da tarefa: "}
                                secureText={false}
                                value={field.value}
                                onChangeText={field.onChange}
                                disabled={isEdit === true && initialValues.dateEnd !== null ? true : false}
                            />
                            {errors.name && (<HelperTextComponent helperType={'error'} helperText={errors.name.message} />)}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name='dateWishEnd'
                    defaultValue={""}
                    rules={{ required: 'Campo obrigatório!' }}
                    render={({ field }) => (
                        <View>
                            <Calendar
                                state={calendarVisible}
                                setCalendarVisible={setCalendarVisible}
                                data={field.value}
                                setData={(newValue) => field.onChange(newValue)}
                                disabled={isEdit === true && initialValues.dateEnd !== null ? true : false}
                                interactions={interactions}
                            />
                            {errors.dateWishEnd && (<HelperTextComponent helperType={'error'} helperText={errors.dateWishEnd.message} />)}
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
                            text={namesDisciplines.length === 0 ? "Não há disciplinas cadastradas." : "Associe a uma disciplina."}
                            arrObjInformation={namesDisciplines}
                            disable={namesDisciplines.length === 0 || isEdit === true && initialValues.dateEnd !== null ? true : false}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='description'
                    defaultValue=""
                    rules={{ required: ' Campo obrigatório! ' }}
                    render={({ field }) => (
                        <View>
                            <TextArea
                                text={"Descricação da tarefa: "}
                                value={field.value}
                                onChangeText={field.onChange}
                                disabled={isEdit === true && initialValues.dateEnd !== null ? true : false}
                            />
                            {errors.description && (<HelperTextComponent helperType={'error'} helperText={errors.description.message} />)}
                        </View>
                    )}
                />

                <ScrollBlock
                    state={subTasks}
                    setState={setSubtasks}
                    addInput={fnAddNewInput}
                    removeInput={fnRemoveInput}
                    finishInput={fnFinishTask}
                    changeInput={fnChangeText}
                    scrollBlockInteractions={interactions}
                    scrollBlockIsEditing={isEdit}
                />

                {interactions && (
                    <ContainerButton>
                        <Button
                            text={"Salvar tarefa."}
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
            </ViewContainer>
        </ContentContainer>
    );
};

export default FormsToDo;