import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { InputForm } from '../../../../../Components/Inputs';
import { ContainerButton } from '../../../../../Styles/DefaultStyles';
import { Button } from '../../../../../Components/Button';
import { convertDateISO8601, convertISODateToSlashDateString, convertISODateToTraceDateString } from '../../../../../Utils/Date/index';
import ToastComponent from "../../../../../Components/Toast";
import TextArea from "../../../../../Components/TextArea";
import ScrollBlock from '../ScrollBlockToDo';
import HelperTextComponent from "../../../../../Components/HelperText";
import Calendar from '../CalendarToDo';

const FormsToDo = ({ aoSubmitar, initialValues, isEdit }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", defaultValues: initialValues });
    const [subTasks, setSubtasks] = useState(isEdit ? initialValues.subTasks || [] : [] || initialValues.subTasks);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [toastVisible, setToastVisible] = useState(false);

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

    const fnSubmit = (data) => {
        const subTasksWithoutId = subTasks.map(({ id, ...rest }) => rest);
        const objEnvio = { ...data, subTasks: subTasksWithoutId };
        objEnvio.dateWishEnd = convertDate(objEnvio.dateWishEnd);

        const selectedDate = objEnvio.dateWishEnd;
        const currentDateFormatada = convertISODateToTraceDateString(currentDate);

        console.log(`A data atual ${currentDateFormatada}`);
        console.log(`A data selecionada ${selectedDate}`);

        if (selectedDate < currentDateFormatada) {
            setDateError(true);
            setToastVisible(true);

            setToastVisible(false);
        } else {
            aoSubmitar(objEnvio);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#40aab8', flexGrow: 1, justifyContent: 'space-evenly', paddingHorizontal: 20 }}>
            <Controller
                control={control}
                name='name'
                defaultValue=""
                rules={{ required: ' Campo obrigatório! ' }}
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
                rules={{ required: ' Campo obrigatório! ' }}
                render={({ field }) => (
                    <View>
                        <Calendar
                            state={calendarVisible}
                            setCalendarVisible={setCalendarVisible}
                            data={field.value}
                            setData={(newValue) => field.onChange(newValue)}
                            disabled={isEdit === true && initialValues.dateEnd !== null ? true : false}
                        />
                        {errors.dateWishEnd && (<HelperTextComponent helperType={'error'} helperText={errors.dateWishEnd.message} />)}
                    </View>
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
            />


            <ContainerButton>
                <Button
                    text={"Salvar tarefa."}
                    onPress={handleSubmit(fnSubmit)}
                />
            </ContainerButton>

            {toastVisible && (
                <ToastComponent
                    ToastType={'error'}
                    Title={'Data inválida!'}
                    Description={'Insira uma data valida, Estudante!'}
                />
            )}
        </SafeAreaView>
    );
};

export default FormsToDo;