import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Input } from "../../../../Components/Inputs";
import { Button, LargestButton } from "../../../../Components/Button";
import { ContainerButton } from "../../../../Styles/DefaultStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import HelperTextComponent from "../../../../Components/HelperText";
import BlockRadioButton from '../BlockRadioButtonGrades';

const FormsGrades = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log('Os dados capturados: ', data);
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#40aab8', flexGrow: 1, justifyContent: 'space-evenly', paddingHorizontal: 20 }}>
            <Controller
                control={control}
                name='disciplina'
                defaultValue={""}
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
                defaultValue={""}
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
                defaultValue={""}
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

            <LargestButton />

            <BlockRadioButton />

            <ContainerButton>
                <Button
                    text={'Salvar avaliação.'}
                    onPress={handleSubmit(onSubmit)}
                />
            </ContainerButton>

        </SafeAreaView>
    )
};

export default FormsGrades;