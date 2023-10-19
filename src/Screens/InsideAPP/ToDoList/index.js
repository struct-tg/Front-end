import React, { Fragment, useEffect, useState, useContext } from "react";
import { ContentContainer, ViewContainer, Title, ViewSettings, ViewBlock, ContainerImageInitial } from "../../../Styles/DefaultStyles/index.js";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Image } from "react-native";
import { getAllTasks, deleteTask, getTaskById, finishTask } from "../../../Services/Requisicoes/Tasks";
import { AutenticacaoContext } from "../../../Contexts/UserContext.js";
import { convertDateISO8601 } from "../../../Utils/Date/index";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import ModalComponent from "./ComponentsToDo/ModalInformationsToDo";
import CardTaskToDo from "./ComponentsToDo/CardTaskToDo";
import AlertComponent from "../../../Components/Alert";
import SpinnerComponent from "../../../Components/Spinner/index.js";
import ResponsiveImage from "react-native-responsive-image";

const ToDoList = () => {
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [modalInformation, setModalInformation] = useState(false);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [alertDelete, setAlertDelete] = useState(false);
    const [alertFinish, setAlertFinish] = useState(false);
    const [alertFinished, setAlertFinished] = useState(false);

    const imageWidth = widthPercentageToDP('100%');
    const imageHeight = heightPercentageToDP('50%');

    const [alertMessages, setAlertMessages] = useState([
        { titulo: 'Deseja mesmo excluir sua tarefa?', descricao: 'Essa ação é irreversível e não terá como você desfazer após a confirmação.' },
        { titulo: `Parabéns, ${username}!`, descricao: 'Você finalizou mais uma tarefa. Continue estudando, estamos com você na sua jornada.' },
        { titulo: `Você já finalizou esta tarefa!`, descricao: `A partir de agora, só é possível visualizar o conteúdo adicionado nesta tarefa.` },
    ]);

    useEffect(() => {
        async function fetchTasks(tokenJWT) {
            try {
                const result = await getAllTasks(tokenJWT)
                setTasks(result);
            } catch (error) {
                console.log('Erro ao obter tarefas: ', error);
            } finally {
                setIsLoading(false);
            }
        }
        if (isFocused) {
            fetchTasks(tokenJWT);
        }
    }, [isFocused]);

    const showDeleteAlert = (idTask) => {
        setSelectedTaskId(idTask);
        setAlertDelete(true);
    }

    const handleConfirmDelete = async () => {
        if (selectedTaskId !== null) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTaskId));
            const result = await deleteTask(selectedTaskId, tokenJWT);
            if (result) {
                setSelectedTaskId(null);
            } else {
                console.log('algo deu errado na delecao de dados');
            }
        }
        setAlertDelete(false);
    }

    const handleCancelDelete = () => {
        setSelectedTaskId(null);
        setAlertDelete(false);
    }

    const showFinishAlert = (idTask) => {
        setSelectedTaskId(idTask);
        setAlertFinish(true);
    }

    const handleConfirmFinish = async () => {
        if (selectedTaskId !== null) {
            const result = await finishTask(selectedTaskId, tokenJWT);
            if (result) {
                const updateDatas = await getAllTasks(tokenJWT);
                setTasks(updateDatas);
            } else {
                console.log('Algo deu errado ao finalizar uma tarefa')
            }
            setSelectedTaskId(null);
        }
        setAlertFinish(false);
    }


    const showAlertFinished = () => {
        setAlertFinished(true);
    }

    const handleConfirmAlertFinished = () => {
        setAlertFinished(false);
    }

    const fnGoToEdit = async (idTask) => {
        const result = await getTaskById(idTask, tokenJWT);
        if (result) {
            navigation.navigate('EditTodo', { obj: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    const goToAddTodo = () => {
        navigation.navigate('AddTodo');
    }

    const goToFiltersTodo = () => {
        navigation.navigate('FiltersTodo');
    }

    const goToChartToDo = () => {
        navigation.navigate('ChartTodo');
    }

    const transformConvertDateISO8601 = (dateString) => {
        return new Date(dateString);
    };

    return (
        <ContentContainer>
            <ViewContainer>
                <ViewSettings>
                    <TouchableOpacity>
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                            onPress={goToAddTodo}
                        />
                    </TouchableOpacity>

                    <ViewBlock>
                        <TouchableOpacity>
                            <Ionicons
                                name={"help-circle-outline"}
                                size={35}
                                color={"white"}
                                onPress={() => setModalInformation(true)}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons
                                name={"pie-chart-outline"}
                                size={35}
                                color={"white"}
                                onPress={goToChartToDo}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons
                                name={"options-outline"}
                                size={35}
                                color={"white"}
                                onPress={goToFiltersTodo}
                            />
                        </TouchableOpacity>
                    </ViewBlock>
                </ViewSettings>

                {isLoading
                    ?
                    (
                        <SpinnerComponent state={isLoading} text={'Carregando...'} />
                    )
                    : tasks.length <= 0
                        ?
                        (<Fragment>
                            <Title>{`Adicione novas tarefas, ${username}!`}</Title>
                            <ContainerImageInitial>
                                <ResponsiveImage
                                    source={require('./ToDo-Image.png')}
                                    initWidth={imageWidth}
                                    initHeight={imageHeight}
                                    resizeMode="cover"
                                />
                            </ContainerImageInitial>
                        </Fragment>
                        )
                        :
                        (
                            <FlatList
                                data={tasks}
                                renderItem={({ item }) => {
                                    const dateEnd = item.dateEnd ? transformConvertDateISO8601(item.dateEnd) : null;
                                    const dateWishEnd = item.dateWishEnd ? transformConvertDateISO8601(item.dateWishEnd) : null;
                                    let state = 0;
                                    if (dateEnd) {
                                        if (dateWishEnd) {
                                            if (dateEnd > dateWishEnd) {
                                                state = 3;
                                            } else {
                                                state = 1;
                                            }
                                        }
                                    }
                                    return (
                                        <CardTaskToDo
                                            title={item.name}
                                            state={state}
                                            onDelete={() => showDeleteAlert(item.id)}
                                            onOpen={() => fnGoToEdit(item.id)}
                                            onFinish={() => item.dateEnd ? showAlertFinished() : showFinishAlert(item.id)}
                                            isModify={true}
                                        />
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        )
                }
            </ViewContainer>

            <ModalComponent
                state={modalInformation}
                setModalInformation={setModalInformation}
            />

            <AlertComponent
                state={alertDelete}
                setVisible={setAlertDelete}
                title={alertMessages[0].titulo}
                message={alertMessages[0].descricao}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            <AlertComponent
                state={alertFinish}
                setVisible={setAlertFinish}
                isInformation={true}
                title={alertMessages[1].titulo}
                message={alertMessages[1].descricao}
                onConfirm={handleConfirmFinish}
            />

            <AlertComponent
                state={alertFinished}
                setVisible={setAlertFinished}
                isInformation={true}
                title={alertMessages[2].titulo}
                message={alertMessages[2].descricao}
                onConfirm={handleConfirmAlertFinished}
            />
        </ContentContainer >
    );
}

export default ToDoList;