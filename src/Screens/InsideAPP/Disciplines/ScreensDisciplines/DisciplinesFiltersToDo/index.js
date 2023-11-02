import React, { Fragment, useState, useEffect, useContext } from 'react';
import { ContentContainer, ViewContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles/index.js";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { AutenticacaoContext } from '../../../../../Contexts/UserContext.js';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getTaskById } from '../../../../../Services/Requests/Tasks/index.js';
import { getAllNamesDiscipline, getAllTasksByDiscipline } from "../../../../../Services/Requests/Disciplines/Filters/index.js";
import { getAllTasks } from '../../../../../Services/Requests/Tasks/index.js';
import { FlatList } from 'react-native-gesture-handler';
import { convertDateISO8601 } from '../../../../../Utils/Date/index.js';
import CardToDo from "../../../ToDoList/ComponentsToDo/CardTaskToDo/index.js";
import DropDownComponent from "../../../../../Components/DropDown/index.js";
import SpinnerComponent from "../../../../../Components/Spinner/index.js";
import ResponsiveImage from 'react-native-responsive-image';

const DisciplineFiltersToDo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dropDown, setDropDown] = useState(0);
    
    const [tasks, setTasks] = useState([]);
    const [listTask, setListTask] = useState([]);
    const [disciplinesNames, setDisciplinesNames] = useState([]);

    const { username, tokenJWT } = useContext(AutenticacaoContext);
    const isFocused = useIsFocused();   
    const navigation = useNavigation();

    const imageWidth = widthPercentageToDP('100%');
    const imageHeight = heightPercentageToDP('50%');

    useEffect(() => {
        async function fetchDatas() {
            try {
                const result = await getAllNamesDiscipline(tokenJWT)
                if (result) {
                    const data = result.map((item) => ({
                        label: item.name,
                        value: item.disciplineId
                    }))
                    const defaultValue = [{ label: 'Todas as tarefas', value: 0 }]
                    setDisciplinesNames([...defaultValue, ...data]);

                    setListTask(result);
                }

                const resultTasks = await getAllTasks(tokenJWT);
                if (resultTasks) {
                    setTasks(resultTasks)
                }
            } catch (error) {
                console.log('Algo deu errado na captura de dados em filters de tarefas por disciplina', JSON.stringify(error));
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchDatas();
    }, [isFocused]);

    async function filterTasks(idDiscipline) {
        try {
            if (idDiscipline === 0) {
                setTasks(await getAllTasks(tokenJWT));
            }
            else {
                setTasks(await getAllTasksByDiscipline(tokenJWT, idDiscipline));
            }
        } catch (error) {
            console.log('Algo deu errado no filtro de tarefas por disciplinas.');
        }
    }

    useEffect(() => {
        filterTasks(dropDown);
    }, [dropDown]);

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
            {isLoading
                ?
                (<SpinnerComponent state={isLoading} text={'Carregando...'} />)
                :
                (
                    <ViewContainer>
                        {listTask.length <= 0
                            ?
                            (<Fragment>
                                <Title>{`Você ainda não tem tarefas relacionadas a disciplinas, ${username}!`}</Title>
                                
                            </Fragment>
                            )
                            :
                            (<ViewContainer>
                                <Title>{`Filtre as suas tarefas por disciplinas, ${username}!`}</Title>
                                <DropDownComponent
                                    arrObjInformation={disciplinesNames}
                                    text={'Selecione a disciplina.'}
                                    state={dropDown}
                                    fnSetValue={(value) => setDropDown(value)}
                                />
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
                                            <CardToDo
                                                title={item.name}
                                                state={state}
                                                date={convertDateISO8601(item.dateWishEnd)}
                                                onOpen={() => fnGoToEdit(item.id)}
                                                isModify={false}
                                            />
                                        );
                                    }}
                                />
                            </ViewContainer>
                            )
                        }
                    </ViewContainer>
                )
            }
        </ContentContainer>
    )
}

export default DisciplineFiltersToDo;