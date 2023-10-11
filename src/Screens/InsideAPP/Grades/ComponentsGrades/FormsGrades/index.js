import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Input } from "../../../../../Components/Inputs";
import { Button } from "../../../../../Components/Button";
import { ContainerButton } from "../../../../../Styles/DefaultStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioButtonComponent from "../../../../../Components/RadioButton";
import HelperTextComponent from "../../../../../Components/HelperText";
import TitleNote from "./StylesFormsGrades";

const FormsGrades = ({ aoSubmitar, initialValues, isEdit }) => {
    const [selectedRadio, setSelectedRadio] = useState(isEdit ? initialValues.typeAv : 'SIMPLE');
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: {
            name: isEdit ? String(initialValues.name) : "",
            nameTeacher: isEdit ? String(initialValues.nameTeacher) : "",
            noteMin: isEdit ? String(initialValues.noteMin.toFixed(2)) : "",
        }
    });

    const onSubmit = (data) => {
        const formData = {
            ...data,
            typeAv: selectedRadio,
            status: 'DISAPPROVED'
        };
        aoSubmitar(formData);
    }

    const handleRadioSelect = (radioId) => {
        setSelectedRadio(radioId);
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#40aab8', flexGrow: 1, justifyContent: 'space-around', paddingHorizontal: 20 }}>
            <Controller
                control={control}
                name='name'
                rules={{ required: "Campo obrigatório!", maxLength: {value: 20, message: "Nome muito grande!"} }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Nome da disciplina: '}
                            secureText={false}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.name && (
                            <HelperTextComponent helperType={'error'} helperText={errors.name.message} />
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name='nameTeacher'
                rules={{ required: "Campo obrigatório!" }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Nome do professor: '}
                            secureText={false}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.nameTeacher && (
                            <HelperTextComponent helperType={'error'} helperText={errors.nameTeacher.message} />
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name='noteMin'
                rules={{ required: "Campo obrigatório!" }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Nota minima para aprovação: '}
                            secureText={false}
                            type={'numeric'}
                            value={field.value}
                            onChangeText={field.onChange}
                            formatNumber={true}
                        />
                        {errors.noteMin && (
                            <HelperTextComponent helperType={'error'} helperText={errors.noteMin.message} />
                        )}
                    </View>
                )}
            />

            <TitleNote>Como deseja calcular sua nota?</TitleNote>
            <RadioButtonComponent
                title={'Média aritmética'}
                id={'SIMPLE'}
                selected={selectedRadio === 'SIMPLE'}
                onSelect={() => setSelectedRadio('SIMPLE')}
            />

            <RadioButtonComponent
                title={'Média ponderada'}
                id={'WEIGHTED'}
                selected={selectedRadio === 'WEIGHTED'}
                onSelect={() => setSelectedRadio('WEIGHTED')}
            />

            <ContainerButton>
                <Button
                    text={'Salvar disciplina.'}
                    onPress={handleSubmit(onSubmit)}
                />
            </ContainerButton>

        </SafeAreaView>
    )
};

export default FormsGrades;