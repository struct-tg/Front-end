import React, { useState, Fragment, useContext, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ContentContainer, ViewContainer, Title, ViewSettings, ViewBlock, ContainerImageInitial } from "../../../Styles/DefaultStyles/index";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AutenticacaoContext } from "../../../Contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { deleteDiscipline, getAllDiscipline, getDisciplineByID, offDiscipline } from "../../../Services/Requisicoes/Grades/index";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import ResponsiveImage from "react-native-responsive-image";
import structSpeak from "../../../Device/Speech.js";
import useMocks from "../../../Mocks/index.js";
import CardGrades from "./ComponentsGrades/CardGradeGrades";
import AlertComponent from "../../../Components/Alert";
import SpinnerComponent from "../../../Components/Spinner";
import * as Haptics from 'expo-haptics';

const Grades = () => {
    const [grades, setGrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { DisciplinesMocks } = useMocks();

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertOffDiscipline, setAlertOffDiscipline] = useState(false);
    const [selectedDisciplineID, setSelectedDisciplineID] = useState(undefined);

    const { tokenJWT } = useContext(AutenticacaoContext);
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
                    <TouchableOpacity onPress={() => { navigation.navigate('AddGrade') }}>
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                        />
                    </TouchableOpacity>

                    <ViewBlock>
                        <TouchableOpacity onPress={() => { structSpeak(DisciplinesMocks.DisciplineScreen.speech) }}>
                            <AntDesign
                                name="aliwangwang-o1"
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('DisciplinesFiltersToDo') }}>
                            <Ionicons
                                name={"library-outline"}
                                size={30}
                                color={"white"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ActivityFilters') }}>
                            <Ionicons
                                name={"options-outline"}
                                size={35}
                                color={"white"}
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
                                <Title>{DisciplinesMocks.DisciplineScreen.title}</Title>
                                <ContainerImageInitial>
                                    <ResponsiveImage
                                        source={DisciplinesMocks.DisciplineScreen.image.content}
                                        initWidth={DisciplinesMocks.DisciplineScreen.image.width}
                                        initHeight={DisciplinesMocks.DisciplineScreen.image.height}
                                        resizeMode={DisciplinesMocks.DisciplineScreen.image.rezide}
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
                title={DisciplinesMocks.DisciplineScreen.alerts.deleteDiscipline.title}
                message={DisciplinesMocks.DisciplineScreen.alerts.deleteDiscipline.description}
                onCancel={handleCancelDeleteDiscipline}
                onConfirm={handleConfirmDeleteDiscipline}
            />

            <AlertComponent
                state={alertOffDiscipline}
                setVisible={setAlertOffDiscipline}
                title={DisciplinesMocks.DisciplineScreen.alerts.finishDiscipline.title}
                message={DisciplinesMocks.DisciplineScreen.alerts.finishDiscipline.description}
                onCancel={handleCancelOffDiscipline}
                onConfirm={handleConfirmOffDiscipline}
            />
        </ContentContainer>
    );
}

export default Grades;