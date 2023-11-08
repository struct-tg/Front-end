import React, { useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native'
import { ContentContainer, ViewContainer, Title, TextFiltersNotFound, ContainerImageInitial, ContainerDatasNotFound } from "../../../../../Styles/DefaultStyles/index";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext.js";
import { getTaskById, getAllFilterTasks } from "../../../../../Services/Requests/Tasks/index.js";
import { convertDateISO8601 } from "../../../../../Utils/Date/index";
import useMocks from '../../../../../Mocks';
import ResponsiveImage from "react-native-responsive-image";
import SearchBarComponent from '../../../../../Components/SearchBar';
import RadioButtonComponent from '../../../../../Components/RadioButton/index.js';
import CardTask from "../../ComponentsToDo/CardTask";
import SpinnerComponent from "../../../../../Components/Spinner";

const FiltersTasks = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [searchQuery, setSearchQuery] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const { ToDoMocks } = useMocks();

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchDatas() {
            try {
                const datas = await getAllFilterTasks(tokenJWT, { status: selectedRadio, partialName: searchQuery });
                if (selectedRadio === null && searchQuery === null) {
                    if (datas.length > 0) {
                        setHasData(true);
                        setAllTasks(datas);
                    }
                }
                else if (selectedRadio !== null || searchQuery !== null) {
                    if (datas.length > 0) {
                        setAllTasks(datas);
                    } else {
                        setAllTasks([]);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDatas();
    }, [isFocused, hasData, selectedRadio, searchQuery])

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

    const transformConvertDateISO8601 = (dateString) => {
        return new Date(dateString);
    };

    return (
        <ContentContainer>
            <ViewContainer>
                {isLoading
                    &&
                    (<SpinnerComponent state={isLoading} text={'Carregando...'} />)
                }

                {
                    hasData
                        ?
                        (
                            <ViewContainer>
                                <SearchBarComponent
                                    setSearchQuery={setSearchQuery}
                                    title={'Pesquise suas tarefas!'}
                                />

                                <RadioButtonComponent
                                    title={'Todas as tarefas.'}
                                    id={null}
                                    selected={selectedRadio === null}
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
                                {
                                    hasData === true && allTasks.length === 0
                                        ?
                                        (<ContainerDatasNotFound>
                                            <TextFiltersNotFound>Não existem tarefas para esses filtros.</TextFiltersNotFound>
                                        </ContainerDatasNotFound>

                                        )
                                        :
                                        (
                                            <FlatList
                                                data={allTasks}
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
                        (
                            <ViewContainer>
                                <Title>{ToDoMocks.ToDoFiltersScreen.title}</Title>
                                <ContainerImageInitial>
                                    <ResponsiveImage
                                        source={ToDoMocks.ToDoFiltersScreen.image.content}
                                        initWidth={ToDoMocks.ToDoFiltersScreen.image.width}
                                        initHeight={ToDoMocks.ToDoFiltersScreen.image.height}
                                        resizeMode={ToDoMocks.ToDoFiltersScreen.image.rezide}
                                    />
                                </ContainerImageInitial>
                            </ViewContainer>
                        )
                }
            </ViewContainer>
        </ContentContainer>
    )
}

export default FiltersTasks;