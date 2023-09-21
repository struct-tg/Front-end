import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Input } from "../../../../Components/Inputs";
import { Button } from "../../../../Components/Button";
import { ContainerButton } from "../../../../Styles/DefaultStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioButtonComponent from "../../../../Components/RadioButton";
import HelperTextComponent from "../../../../Components/HelperText";
import TitleNote from "./StylesFormsGrades";

const FormsGrades = () => {
    const [selectedRadio, setSelectedRadio] = useState('media');
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange", defaultValues: {
            disciplina: "",
            nomeProfessor: "",
            notaMinima: "",
        }
    });

    const onSubmit = (data) => {
        const formData = {
            ...data,
            calculoNota: selectedRadio,
        };
        console.log('Os dados capturados: ', formData);
    }

    const handleRadioSelect = (radioId) => {
        setSelectedRadio(radioId);
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#40aab8', flexGrow: 1, justifyContent: 'space-around', paddingHorizontal: 20 }}>
            <Controller
                control={control}
                name='disciplina'

                rules={{ required: "Campo obrigatório!" }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Nome da disciplina: '}
                            secureText={false}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.disciplina && (
                            <HelperTextComponent helperType={'error'} helperText={errors.disciplina.message} />
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name='nomeProfessor'

                rules={{ required: "Campo obrigatório!" }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Nome do professor: '}
                            secureText={false}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.nomeProfessor && (
                            <HelperTextComponent helperType={'error'} helperText={errors.nomeProfessor.message} />
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name='notaMinima'

                rules={{ required: "Campo obrigatório!" }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={'Nota minima para aprovação: '}
                            secureText={false}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.notaMinima && (
                            <HelperTextComponent helperType={'error'} helperText={errors.notaMinima.message} />
                        )}
                    </View>
                )}
            />

            <TitleNote>Como deseja calcular sua nota?</TitleNote>
            <RadioButtonComponent
                title={'Média aritmética'}
                id={'media'}
                selected={selectedRadio === 'media'}
                onSelect={() => setSelectedRadio('media')}
            />

            <RadioButtonComponent
                title={'Média ponderada'}
                id={'ponderada'}
                selected={selectedRadio === 'ponderada'}
                onSelect={() => setSelectedRadio('ponderada')}
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