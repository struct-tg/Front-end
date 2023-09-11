import React, { Fragment, useState, useEffect, useContext } from 'react';
import { View, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TitleToDo, ViewTasks } from "../../StylesToDoList";
import { useIsFocused } from '@react-navigation/native';
import { AutenticacaoContext } from "../../../../Contexts/UserContext.js";
import { getAllTasks } from "../../../../Services/Requisicoes/Tasks/index.js";
import SearchBarComponent from '../../../../Components/SearchBar/index.js';
import RadioButtonComponent from '../../../../Components/RadioButton/index.js';
import CardTaskToDo from "../../ComponentsToDo/CardTaskToDo";

const FiltersTasks = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [allTasks, setAllTasks] = useState([]);
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const isFocused = useIsFocused(false);

    useEffect(() => {
        async function fetchTasks() {
            const result = await getAllTasks(tokenJWT);
            setAllTasks(result);
        }
        if (isFocused) {
            fetchTasks(tokenJWT)
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={{ flexGrow: 1, padding: 24, justifyContent: "space-between", backgroundColor: "#2aabbf" }}>
            <SearchBarComponent
                setSearchQuery={setSearchQuery}
            />
            <RadioButtonComponent />

            {allTasks.length <= 0 ? (
                <Fragment>
                    <TitleToDo>{`Cadastre novas tarefas, ${username}!`}</TitleToDo>
                    <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('./Filter-Image.png')}
                            style={{ width: "70%", height: "50%" }}
                            resizeMode="cover"
                        />
                    </View>
                </Fragment>
            ) : (
                <ViewTasks>
                    <FlatList
                        data={allTasks}
                        renderItem={({ item }) => <CardTaskToDo
                            title={item.name}
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