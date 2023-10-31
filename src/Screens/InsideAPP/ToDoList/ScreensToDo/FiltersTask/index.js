import React, { Fragment, useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native'
import { ContentContainer, ViewContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles/index";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext.js";
import { getAllTasks, getTaskById } from "../../../../../Services/Requisicoes/Tasks/index.js";
import { convertDateISO8601 } from "../../../../../Utils/Date/index";
import useMocks from '../../../../../Mocks';
import ResponsiveImage from "react-native-responsive-image";
import SearchBarComponent from '../../../../../Components/SearchBar';
import RadioButtonComponent from '../../../../../Components/RadioButton/index.js';
import CardTaskToDo from "../../ComponentsToDo/CardTaskToDo";
import SpinnerComponent from "../../../../../Components/Spinner";

const FiltersTasks = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const { ToDoMocks } = useMocks();

    const isFocused = useIsFocused(false);
    const navigation = useNavigation();

    const loadTasks = async (tokenJWT) => {
        try {
            const tasks = await getAllTasks(tokenJWT);
            setAllTasks(tasks);
        } catch (error) {
            console.log('Erro ao carregar dados:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const filterAndSearchTasks = () => {
        let filteredTasks = allTasks;

        if (selectedRadio === 'finished') {
            filteredTasks = filteredTasks.filter(item => item.dateEnd !== null);
        } else if (selectedRadio === 'lates') {
            filteredTasks = filteredTasks.filter(item =>
                item.dateEnd !== null && convertDateISO8601(item.dateEnd) > convertDateISO8601(item.dateWishEnd)
            );
        } else if (selectedRadio === 'pending') {
            filteredTasks = filteredTasks.filter(item => item.dateEnd === null);
        }

        const query = searchQuery.toLowerCase();
        if (query) {
            filteredTasks = filteredTasks.filter(item => item.name.toLowerCase().includes(query));
        }
        return filteredTasks;
    }

    useEffect(() => {
        async function fetchDatas() {
            if (isFocused) {
                await loadTasks(tokenJWT);
            }
        }
        fetchDatas()
    }, [isFocused, tokenJWT]);

    const handleRadioSelect = (radioId) => {
        setSelectedRadio(radioId);
    };

    const fnGoToEdit = async (idTask) => {
        const result = await getTaskById(idTask, tokenJWT);
        if (result) {
            navigation.navigate('EditTodo', { obj: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    return (
        <ContentContainer>
            {isLoading ?
                (
                    <SpinnerComponent state={isLoading} text={'Carregando...'} />
                )
                :
                (<ViewContainer>
                    {allTasks.length <= 0 ? (
                        <Fragment>
                            <Title>{ToDoMocks.ToDoFiltersScreen.title}</Title>
                            <ContainerImageInitial>
                                <ResponsiveImage
                                    source={ToDoMocks.ToDoFiltersScreen.image.content}
                                    initWidth={ToDoMocks.ToDoFiltersScreen.image.width}
                                    initHeight={ToDoMocks.ToDoFiltersScreen.image.height}
                                    resizeMode={ToDoMocks.ToDoFiltersScreen.image.rezide}
                                />
                            </ContainerImageInitial>
                        </Fragment>
                    ) : (
                        <ViewContainer>
                            <SearchBarComponent
                                setSearchQuery={setSearchQuery}
                                title={'Pesquise suas tarefas!'}
                            />

                            <RadioButtonComponent
                                title={'Todas as tarefas.'}
                                id={'all'}
                                selected={selectedRadio === 'all'}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Tarefas concluídas.'}
                                id={'finished'}
                                selected={selectedRadio === 'finished'}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Tarefas Atrasadas.'}
                                id={'lates'}
                                selected={selectedRadio === 'lates'}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Tarefas pendentes.'}
                                id={'pending'}
                                selected={selectedRadio === 'pending'}
                                onSelect={handleRadioSelect}
                            />

                            <FlatList
                                data={filterAndSearchTasks()}
                                renderItem={({ item }) => <CardTaskToDo
                                    title={item.name}
                                    state={item.dateEnd === null
                                        ? 0
                                        : item.dateEnd !== null
                                            ? convertDateISO8601(item.dateEnd) > convertDateISO8601(item.dateWishEnd)
                                                ? 3
                                                : 1
                                            : null}
                                    isModify={false}
                                    onOpen={() => fnGoToEdit(item.id)}
                                    date={convertDateISO8601(item.dateWishEnd)}
                                />
                                }
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
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

export default FiltersTasks;