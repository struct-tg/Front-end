import React, { useState, Fragment, useContext, useEffect } from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { ContentContainer, ViewContainer, Title, ViewSettings, ViewBlock, ContainerImageInitial } from "../../../Styles/DefaultStyles/index";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AutenticacaoContext } from "../../../Contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { deleteDiscipline, getAllDiscipline, getDisciplineByID, offDiscipline } from "../../../Services/Requisicoes/Grades/index";
import { FlatList } from "react-native-gesture-handler";
import CardGrades from "./ComponentsGrades/CardGradeGrades";
import AlertComponent from "../../../Components/Alert";
import SpinnerComponent from "../../../Components/Spinner";
import * as Haptics from 'expo-haptics';

const Grades = () => {
    const [grades, setGrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertOffDiscipline, setAlertOffDiscipline] = useState(false);

    const [selectedDisciplineID, setSelectedDisciplineID] = useState(undefined);

    const [alertMessages, setAlertMessages] = useState([
        { titulo: 'Deseja mesmo excluir sua disciplina?', descricao: 'Essa ação é irreversível e não terá como você desfazer após a confirmação.' },
        { titulo: 'Você tem certeza dessa ação?', descricao: 'Ao confirmar, você encerrará está disciplina e todas as suas atividades avaliativas.' }
    ]);

    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused(false);

    useEffect(() => {
        async function fetchDatas() {
            try {
                const result = await getAllDiscipline(tokenJWT);
                setGrades(result);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDatas();
    }, [isFocused]);

    const goToAddGrade = () => {
        navigation.navigate('AddGrade');
    };

    const goToActivityFilters = () => {
        navigation.navigate('ActivityFilters');
    };

    const showAlertDeleteDiscipline = (DisciplineID) => {
        setSelectedDisciplineID(DisciplineID);
        setAlertVisible(true);
    };

    const handleCancelDeleteDiscipline = () => {
        setSelectedDisciplineID(undefined);
        setAlertVisible(false);
    };

    const handleConfirmDeleteDiscipline = async () => {
        if (selectedDisciplineID != null) {
            setGrades((prevGrades) => prevGrades.filter((grade) => grade.id != selectedDisciplineID));
            const result = await deleteDiscipline(selectedDisciplineID, tokenJWT);
            if (result) {
                setSelectedDisciplineID(undefined)
            } else {
                console.log('Nao excluiu');
            }
        }
        setAlertVisible(false);
    }

    const fnGoToEdit = async (idDiscipline) => {
        const result = await getDisciplineByID(tokenJWT, idDiscipline);
        if (result) {
            navigation.navigate('EditGrade', { objGrade: result });
        } else {
            console.log('Algo deu errado');
        }
    }

    const showAlertOffDiscipline = async (DisciplineID) => {
        setSelectedDisciplineID(DisciplineID);
        await handleLongPress();
        setAlertOffDiscipline(true);
    };

    const handleLongPress = async () => {
        try {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        } catch (error) {
            console.error('Erro ao acionar feedback tátil:', error);
        }
    };

    const handleCancelOffDiscipline = () => {
        setAlertOffDiscipline(false);
    }

    const handleConfirmOffDiscipline = async () => {
        if (selectedDisciplineID !== null) {
            const result = await offDiscipline(selectedDisciplineID, tokenJWT)
            if (result) {
                const updateDatas = await getAllDiscipline(tokenJWT)
                setGrades(updateDatas);
            } else {
                console.log('Algo deu errado ao finalizar uma disciplina')
            }
            setSelectedDisciplineID(null);
        }
        setAlertOffDiscipline(false);
    }

    return (
        <ContentContainer>
            <ViewContainer>

                <ViewSettings>
                    <TouchableOpacity>
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                            onPress={goToAddGrade}
                        />
                    </TouchableOpacity>

                    <ViewBlock>
                        <TouchableOpacity>
                            <Ionicons
                                name={"library-outline"}
                                size={30}
                                color={"white"}
                                onPress={() => navigation.navigate('DisciplinesFiltersToDo')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons
                                name={"options-outline"}
                                size={35}
                                color={"white"}
                                onPress={goToActivityFilters}
                            />
                        </TouchableOpacity>
                    </ViewBlock>
                </ViewSettings>

                {isLoading
                    ?
                    (<SpinnerComponent state={isLoading} text={'Carregando...'} />)
                    :
                    grades.length <= 0
                        ?
                        (
                            <Fragment>
                                <Title>{`Adicione novas disciplinas, ${username}!`}</Title>
                                <ContainerImageInitial>
                                    <Image
                                        source={require('./Grade-Image.png')}
                                        style={{ width: "100%", height: "55%" }}
                                        resizeMode="cover"
                                    />
                                </ContainerImageInitial>
                            </Fragment>
                        )
                        :
                        (
                            <FlatList
                                data={grades}
                                renderItem={({ item }) =>
                                    <CardGrades
                                        titleGrades={item.name}
                                        status={item.dateEnd}
                                        onOFF={() => item.dateEnd === null ? showAlertOffDiscipline(item.id) : null}
                                        noteMin={item.noteMin}
                                        noteCurrent={item.note}
                                        onEdit={() => fnGoToEdit(item.id)}
                                        isModify={true}
                                        onDelete={() => showAlertDeleteDiscipline(item.id)}
                                        activity={() => {
                                            if (item.activity && item.activity.length > 0) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        }}
                                    />
                                }
                                showsVerticalScrollIndicator={false}
                            />

                        )
                }
            </ViewContainer>

            <AlertComponent
                state={alertVisible}
                setVisible={setAlertVisible}
                title={alertMessages[0].titulo}
                message={alertMessages[0].descricao}
                onCancel={handleCancelDeleteDiscipline}
                onConfirm={handleConfirmDeleteDiscipline}
            />

            <AlertComponent
                state={alertOffDiscipline}
                setVisible={setAlertOffDiscipline}
                title={alertMessages[1].titulo}
                message={alertMessages[1].descricao}
                onCancel={handleCancelOffDiscipline}
                onConfirm={handleConfirmOffDiscipline}
            />
        </ContentContainer>
    );
}

export default Grades;