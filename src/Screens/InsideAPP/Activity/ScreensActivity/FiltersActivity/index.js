import React, { useState, useEffect, useContext } from "react";
import { ContentContainer, ViewContainer, Title, ContainerImageInitial, ContainerDatasNotFound, TextFiltersNotFound } from "../../../../../Styles/DefaultStyles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getAllFiltersActivities, getActivityById } from "../../../../../Services/Requests/Activity";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext.js";
import { FlatList } from "react-native-gesture-handler";
import { convertDateISO8601 } from "../../../../../Utils/Date";
import useMocks from "../../../../../Mocks/index.js";
import ResponsiveImage from "react-native-responsive-image";
import CardActivity from "../../ComponentsActivity/CardActivity";
import SearchBarComponent from "../../../../../Components/SearchBar";
import RadioButtonComponent from "../../../../../Components/RadioButton";
import SpinnerComponent from "../../../../../Components/Spinner";

const FilterActivity = ({ route }) => {
    const { ActivityMocks } = useMocks();
    const { tokenJWT } = useContext(AutenticacaoContext);
    const [activities, setActivities] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [hasData, setHasData] = useState(false);
    const [contextID, setContextID] = useState(route.params.DisciplineContext);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fnGoToEdit = async (idActivity) => {
        const result = await getActivityById(tokenJWT, contextID, idActivity);
        if (result) {
            navigation.navigate('EditActivity', { objEdit: result, typeCalculator: route.params.typeCalculator, isFinishedDiscipline: route.params.isFinishedDiscipline });
        } else {
            console.log('Algo deu errado');
        }
    }

    useEffect(() => {
        async function fetchDatas() {
            try {
                const datas = await getAllFiltersActivities(tokenJWT, contextID, { typeAc: selectedRadio, partialName: searchQuery })
                if (selectedRadio === null && searchQuery === null) {
                    if (datas.length > 0) {
                        setHasData(true);
                        setActivities(datas);
                    }
                }
                else if (selectedRadio !== null || searchQuery !== null) {
                    if (datas.length > 0) {
                        setActivities(datas);
                    } else {
                        setActivities([]);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDatas();
    }, [isFocused, hasData, selectedRadio, searchQuery]);

    const handleRadioSelect = (radioId) => {
        setSelectedRadio(radioId);
    };

    return (
        <ContentContainer>
            <ViewContainer>
                {
                    isLoading
                    &&
                    (<SpinnerComponent state={isLoading} text={'Carregando...'} />)
                }

                {hasData
                    ?
                    (
                        <ViewContainer>
                            <SearchBarComponent
                                setSearchQuery={setSearchQuery}
                                title={'Pesquise suas atividades!'}
                            />

                            <RadioButtonComponent
                                title={'Todas as atividades.'}
                                id={null}
                                selected={selectedRadio === null}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Provas.'}
                                id={'EXAMINATION'}
                                selected={selectedRadio === 'EXAMINATION'}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Atividades.'}
                                id={'ACTIVITY'}
                                selected={selectedRadio === 'ACTIVITY'}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Trabalho.'}
                                id={'WORK'}
                                selected={selectedRadio === 'WORK'}
                                onSelect={handleRadioSelect}
                            />

                            {hasData === true && activities.length === 0
                                ?
                                (
                                    <ContainerDatasNotFound>
                                        <TextFiltersNotFound>Não existem atividades para esses filtros.</TextFiltersNotFound>
                                    </ContainerDatasNotFound>
                                )
                                :
                                (
                                    <FlatList
                                        data={activities}
                                        renderItem={({ item }) => (
                                            <CardActivity
                                                titleActivity={item.name}
                                                onEdit={() => fnGoToEdit(item.id)}
                                                data={convertDateISO8601(item.date)}
                                                weight={item.weight}
                                                note={item.note}
                                                type={item.typeAc}
                                            />
                                        )}
                                        showsVerticalScrollIndicator={false}
                                    />
                                )
                            }
                        </ViewContainer>
                    )
                    :
                    (
                        <ViewContainer>
                            <Title>{ActivityMocks.ActivityFiltersScreen.title}</Title>
                            <ContainerImageInitial>
                                <ResponsiveImage
                                    source={ActivityMocks.ActivityFiltersScreen.image.content}
                                    initWidth={ActivityMocks.ActivityFiltersScreen.image.width}
                                    initHeight={ActivityMocks.ActivityFiltersScreen.image.height}
                                    resizeMode={ActivityMocks.ActivityFiltersScreen.image.rezide}
                                />
                            </ContainerImageInitial>
                        </ViewContainer>
                    )
                }
            </ViewContainer>
        </ContentContainer>
    );
}

export default FilterActivity;