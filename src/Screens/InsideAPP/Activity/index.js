import React, { Fragment, useState, useEffect, useContext } from "react"
import { ContentContainer, ViewContainer, ViewSettings, ContainerImageInitial, Title } from "../../../Styles/DefaultStyles/index.js";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getAllActivity, getActivityById, deleteActivity } from "../../../Services/Requests/Activity";
import { AutenticacaoContext } from "../../../Contexts/UserContext.js";
import { convertDateISO8601 } from "../../../Utils/Date";
import AlertComponent from "../../../Components/Alert/index.js";
import CardActivity from "./ComponentsActivity/CardActivity/index.js";
import useMocks from "../../../Mocks/index.js";
import ResponsiveImage from "react-native-responsive-image";
import SpinnerComponent from "../../../Components/Spinner";

const Activity = ({ route }) => {
    const { ActivityMocks } = useMocks();
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const [activities, setActivities] = useState([]);
    const [objRoute, setDisciplineID] = useState(route.params);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [alertDelete, setAlertDelete] = useState(false);

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchDatas() {
            try {
                const result = await getAllActivity(tokenJWT, objRoute.disciplineID);
                setActivities(result);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDatas();
    }, [isFocused, objRoute]);

    const handleConfirmDelete = async () => {
        if (selectedActivityId !== null) {
            setActivities((prevTasks) => prevTasks.filter((task) => task.id !== selectedActivityId));
            const result = await deleteActivity(tokenJWT, objRoute.disciplineID, selectedActivityId);
            if (result) {
                setSelectedActivityId(null);
            } else {
                console.log('algo deu errado na delecao de uma atividade');
            }
        }
        setAlertDelete(false);
    }

    const handleCancelDelete = () => {
        setSelectedActivityId(null);
        setAlertDelete(false);
    }

    const showDeleteAlert = (idActivity) => {
        setSelectedActivityId(idActivity);
        setAlertDelete(true);
    }

    const fnGoToEdit = async (idActivity) => {
        const result = await getActivityById(tokenJWT, objRoute.disciplineID, idActivity);
        if (result) {
            navigation.navigate('EditActivity', { objEdit: result, typeCalculator: objRoute.typeAc, isFinishedDiscipline: objRoute.isFinished !== null ? true : false })
        } else {
            console.log('Algo deu errado');
        }
    }

    return (
        <ContentContainer>
            <ViewContainer>
                <ViewSettings>
                    <TouchableOpacity onPress={() => navigation.navigate('AddActivity', { typeCalculator: objRoute.typeAc })}>
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('FilterActivity', { DisciplineContext: objRoute.disciplineID, typeCalculator: objRoute.typeAc, isFinishedDiscipline: objRoute.isFinished !== null ? true : false })}>
                        <Ionicons
                            name={"options-outline"}
                            size={35}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </ViewSettings>

                {isLoading
                    ?
                    (<SpinnerComponent state={isLoading} text={'Carregando...'} />)
                    :
                    activities.length <= 0
                        ?
                        (<Fragment>
                            <Title>{ActivityMocks.ActivityScreen.title}</Title>
                            <ContainerImageInitial>
                                <ResponsiveImage
                                    source={ActivityMocks.ActivityScreen.image.content}
                                    initWidth={ActivityMocks.ActivityScreen.image.width}
                                    initHeight={ActivityMocks.ActivityScreen.image.height}
                                    resizeMode={ActivityMocks.ActivityScreen.image.rezide}
                                />
                            </ContainerImageInitial>
                        </Fragment>
                        )
                        :
                        (<Fragment>
                            <Title>{`Essas são as suas atividades da disciplina de ${objRoute.disciplineName}, ${username}!`}</Title>
                            <FlatList
                                data={activities}
                                renderItem={({ item }) => (
                                    <CardActivity
                                        titleActivity={item.name}
                                        onEdit={() => fnGoToEdit(item.id)}
                                        onDelete={() => showDeleteAlert(item.id)}
                                        isModify={true}
                                        data={convertDateISO8601(item.date)}
                                        weight={item.weight}
                                        note={item.note}
                                        type={item.typeAc}
                                    />
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </Fragment>
                        )
                }
            </ViewContainer>

            <AlertComponent
                state={alertDelete}
                setVisible={setAlertDelete}
                title={ActivityMocks.ActivityScreen.alerts.deleteActivity.title}
                message={ActivityMocks.ActivityScreen.alerts.deleteActivity.description}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

        </ContentContainer>
    );
}

export default Activity;