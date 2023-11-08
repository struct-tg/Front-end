import React, { useState, useEffect, useContext } from 'react';
import { ContentContainer, ViewContainer, Title, ContainerImageInitial, ContainerDatasNotFound, TextFiltersNotFound } from "../../../../../Styles/DefaultStyles/index.js";
import { AutenticacaoContext } from '../../../../../Contexts/UserContext.js';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getTaskById, getAllFilterTasks } from '../../../../../Services/Requests/Tasks/index.js';
import { getAllNamesDiscipline } from "../../../../../Services/Requests/Disciplines/Filters/index.js";
import { FlatList } from 'react-native-gesture-handler';
import { convertDateISO8601 } from '../../../../../Utils/Date/index.js';
import useMocks from '../../../../../Mocks/index.js';
import CardTask from "../../../ToDoList/ComponentsToDo/CardTask";
import DropDownComponent from "../../../../../Components/DropDown/index.js";
import SpinnerComponent from "../../../../../Components/Spinner/index.js";
import ResponsiveImage from 'react-native-responsive-image';

const DisciplineFiltersToDo = () => {
    const [disciplinesNames, setDisciplinesNames] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [dropDown, setDropDown] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { DisciplinesMocks } = useMocks();
    const { tokenJWT } = useContext(AutenticacaoContext);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchDatas() {
            try {
                const [disciplines, tasksByDisciplines] = await Promise.all([getAllNamesDiscipline(tokenJWT), getAllFilterTasks(tokenJWT, { disciplineId: dropDown })]);
                if (disciplines) {
                    const data = disciplines.map((item) => ({ label: item.name, value: item.disciplineId }))
                    const defaultValue = [{ label: 'Todas as tarefas', value: 0 }]
                    setDisciplinesNames([...defaultValue, ...data]);
                }
                if (dropDown === 0) {
                    if (tasksByDisciplines.length > 0) {
                        setAllTasks(tasksByDisciplines);
                        setHasData(true);
                    } else {
                        setAllTasks([]);
                        setHasData(false);
                    }
                } else {
                    setAllTasks(tasksByDisciplines);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }

        fetchDatas();
    }, [isFocused, dropDown]);

    const fnGoToEdit = async (idTask) => {
        const result = await getTaskById(idTask, tokenJWT);
        if (result) {
            navigation.navigate('EditTodo', { obj: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    const transformConvertDateISO8601 = (dateString) => {
        return new Date(dateString);
    };

    return (
        <ContentContainer>
            <ViewContainer>
                {isLoading
                    &&
                    (
                        <SpinnerComponent state={isLoading} text={'Carregando...'} />
                    )
                }

                {hasData
                    ?
                    (<ViewContainer>
                        <Title>Filtre as suas tarefas relacionadas por disciplina.</Title>
                        <DropDownComponent
                            text={'Selecione a disciplina'}
                            arrObjInformation={disciplinesNames}
                            fnSetValue={(state) => setDropDown(state)}
                            state={dropDown}
                        />
                        {
                            hasData === true && allTasks.length === 0
                                ?
                                (<ContainerDatasNotFound>
                                    <TextFiltersNotFound>Não existem tarefas para esta disciplina.</TextFiltersNotFound>
                                </ContainerDatasNotFound>
                                )
                                :
                                (
                                    <FlatList
                                        data={allTasks}
                                        style={{ marginTop: 15 }}
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
                                                <CardTask
                                                    title={item.name}
                                                    isModify={false}
                                                    onDelete={() => showDeleteAlert(item.id)}
                                                    onOpen={() => fnGoToEdit(item.id)}
                                                    onFinish={() => item.dateEnd ? showAlertFinished() : showFinishAlert(item.id)}
                                                    date={convertDateISO8601(item.dateWishEnd)}
                                                    situation={state}
                                                />
                                            );
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                    />
                                )
                        }
                    </ViewContainer>
                    )
                    :
                    (<ViewContainer>
                        <Title>{DisciplinesMocks.DisciplineFiltersToDo.title}</Title>
                        <ContainerImageInitial>
                            <ResponsiveImage
                                source={DisciplinesMocks.DisciplineFiltersToDo.image.content}
                                initWidth={DisciplinesMocks.DisciplineFiltersToDo.image.width}
                                initHeight={DisciplinesMocks.DisciplineFiltersToDo.image.height}
                                resizeMode={DisciplinesMocks.DisciplineFiltersToDo.image.rezide}
                            />
                        </ContainerImageInitial>
                    </ViewContainer>
                    )
                }
            </ViewContainer>
        </ContentContainer>
    )
}

export default DisciplineFiltersToDo;