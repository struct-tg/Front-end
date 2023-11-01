import React, { Fragment, useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native'
import { ContentContainer, ViewContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles/index";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext.js";
import { getAllTasks, getTaskById, getAllFilterTasks } from "../../../../../Services/Requests/Tasks/index.js";
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
    const [isLoading, setIsLoading] = useState(false);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const { ToDoMocks } = useMocks();

    const isFocused = useIsFocused(false);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchDatas() {
            const result = await getAllFilterTasks(tokenJWT, { status: 'COMPLETED', partialName: '' });
            setAllTasks(result);
        }
        fetchDatas();
    }, [isFocused, searchQuery, selectedRadio]);

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
                                id={'COMPLETED'}
                                selected={selectedRadio === 'COMPLETED'}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Tarefas Atrasadas.'}
                                id={'LATE'}
                                selected={selectedRadio === 'LATE'}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Tarefas pendentes.'}
                                id={'NOTCOMPLETED'}
                                selected={selectedRadio === 'NOTCOMPLETED'}
                                onSelect={handleRadioSelect}
                            />

                            <FlatList
                                data={allTasks}
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