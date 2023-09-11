import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "../../Components/Inputs";
import { Button } from "../../Components/Button";
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { cadastraUsuario } from "../../Services/Requisicoes/Users/index.js";
import {
    Container,
    ViewContainer,
    UppercaseTitle,
    ContainerButton
} from "../../Styles/DefaultStyles";
import HelperTextComponent from "../../Components/HelperText";
import ToastComponent from "../../Components/Toast";

const ScreenRegister = () => {
    const [userRegister, setUserRegister] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const { control, handleSubmit, formState: { errors }, watch, setError } = useForm({
        mode: 'onChange',
    });
    const navigation = useNavigation();

    const returnLogin = () => {
        navigation.navigate('Login');
    }

    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'As senhas não coincidem'
            });
        } else {
            const { confirmPassword, ...objRegistro } = data;
            result = await cadastraUsuario(objRegistro)
            if (result) {
                setUserRegister(result);
                returnLogin();
            }
            setToastVisible(true);
        }
    }

    return (
        <Container>
            <ViewContainer >
                <UppercaseTitle>Faça o seu cadastro.</UppercaseTitle>
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: `O campo de nome é obrigatório.`,
                        minLength: { value: 2, message: "O nome deve ter pelo menos 2 caracteres." }
                    }}
                    defaultValue=""
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={false}
                                text={"Digite o seu nome: "}
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.name && (
                                <HelperTextComponent helperType={"error"} helperText={errors.name.message} />
                            )}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: `O campo de email é obrigatório.`,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido',
                        },
                        minLength: { value: 8, message: "O email deve ter pelo menos 8 caracteres." }
                    }}
                    defaultValue=""
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={false}
                                text="Informe o seu E-mail: "
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.email && (
                                <HelperTextComponent helperType={"error"} helperText={errors.email.message} />
                            )}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: `O campo de senha é obrigatório.`,
                        minLength: { value: 8, message: "O senha deve ter pelo menos 8 caracteres." }
                    }}
                    defaultValue=""
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={true}
                                text="Informe a sua senha: "
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.password && (
                                <HelperTextComponent helperType={"error"} helperText={errors.password.message} />
                            )}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                        required: `As senhas não são iguais.`,
                    }}
                    defaultValue=""
                    render={({ field }) => (
                        <View>
                            <Input
                                secureText={true}
                                text="Confirme a sua senha: "
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.confirmPassword && (
                                <HelperTextComponent helperType={"error"} helperText={errors.confirmPassword.message} />
                            )}
                        </View>
                    )}
                />

                <ContainerButton>
                    <Button
                        text="Registrar!"
                        onPress={handleSubmit(onSubmit)}
                    />
                </ContainerButton>
            </ViewContainer>

            {toastVisible && (
                <ToastComponent
                    ToastType={userRegister ? 'success' : 'error'}
                    Title={userRegister ? 'Conta criada com sucesso.' : 'Erro ao criar a conta.'}
                    Description={userRegister ? 'Bem-vindo, Estudante!' : 'Houve um erro ao criar a conta!'}
                />
            )}
        </Container>
    );
}

export default ScreenRegister;