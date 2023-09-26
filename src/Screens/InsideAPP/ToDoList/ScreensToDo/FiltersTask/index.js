import React, { Fragment, useState, useEffect, useContext } from 'react';
import { View, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TitleToDo, ViewTasks } from "../../StylesToDoList";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext.js";
import { getAllTasks, getTaskById } from "../../../../../Services/Requisicoes/Tasks/index.js";
import { convertDateISO8601, convertISODateToSlashDateString } from "../../../../../Utils/Date/index";
import SearchBarComponent from '../../../../../Components/SearchBar';
import RadioButtonComponent from '../../../../../Components/RadioButton/index.js';
import CardTaskToDo from "../../ComponentsToDo/CardTaskToDo";
import SpinnerComponent from "../../../../../Components/Spinner";

const FiltersTasks = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const { tokenJWT, username } = useContext(AutenticacaoContext);
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
        <SafeAreaView style={{ flexGrow: 1, padding: 24, justifyContent: "space-between", backgroundColor: "#2aabbf" }}>
            {isLoading ? (<SpinnerComponent state={isLoading} text={'Carregando os filtros...'} />)
                : allTasks.length <= 0 ? (
                    <Fragment>
                        <TitleToDo>{`Cadastre novas tarefas para filtrar, ${username}!`}</TitleToDo>
                        <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('./Filter-Image.png')}
                                style={{ width: "100%", height: "55%" }}
                                resizeMode="cover"
                            />
                        </View>
                    </Fragment>
                ) : (
                    <ViewTasks>
                        <SearchBarComponent
                            setSearchQuery={setSearchQuery}
                        />

                        <RadioButtonComponent
                            title={'Todas as tarefas'}
                            id={'all'}
                            selected={selectedRadio === 'all'}
                            onSelect={handleRadioSelect}
                        />

                        <RadioButtonComponent
                            title={'Tarefas concluídas'}
                            id={'finished'}
                            selected={selectedRadio === 'finished'}
                            onSelect={handleRadioSelect}
                        />

                        <RadioButtonComponent
                            title={'Tarefas Atrasadas'}
                            id={'lates'}
                            selected={selectedRadio === 'lates'}
                            onSelect={handleRadioSelect}
                        />

                        <RadioButtonComponent
                            title={'Tarefas pendentes'}
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
                        />
                    </ViewTasks>
                )
            }
        </SafeAreaView>
    )
}

export default FiltersTasks;