import React, { useState, useContext, useEffect, Fragment } from "react";
import { ContentContainer, ViewContainer, Title, ContainerImageInitial, ContainerDatasNotFound, TextFiltersNotFound } from "../../../../../Styles/DefaultStyles/index";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { getDisciplineByID } from "../../../../../Services/Requests/Disciplines/index.js";
import { getAllFilterDiscipline } from "../../../../../Services/Requests/Disciplines/Filters/index.js";
import { useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import useMocks from "../../../../../Mocks/index.js";
import SpinnerComponent from "../../../../../Components/Spinner";
import CardGrades from "../../ComponentsDisciplines/CardDiscipline";
import SearchBarComponent from "../../../../../Components/SearchBar/index";
import RadioButtonComponent from "../../../../../Components/RadioButton/index";
import ResponsiveImage from "react-native-responsive-image";

const DisciplineFilters = () => {
    const [grades, setGrades] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const { DisciplinesMocks } = useMocks();
    const isFocused = useIsFocused(false);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchDatas() {
            try {
                const datas = await getAllFilterDiscipline(tokenJWT, { status: selectedRadio, partialName: searchQuery });
                if (selectedRadio === null && searchQuery === null) {
                    if (datas.length > 0) {
                        setHasData(true);
                        setGrades(datas);
                    }
                } else if (selectedRadio !== null || searchQuery !== null) {
                    if (datas.length > 0) {
                        setGrades(datas);
                    } else {
                        setGrades([]);
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

    const fnGoToEdit = async (idDiscipline) => {
        const result = await getDisciplineByID(tokenJWT, idDiscipline);
        if (result) {
            navigation.navigate('EditDiscipline', { objGrade: result });
        } else {
            console.log('Algo deu errado');
        }
    }

    return (
        <ContentContainer>
            <ViewContainer>
                {isLoading
                    &&
                    (<SpinnerComponent state={isLoading} text={'Carregando...'} />)
                }
                {hasData
                    ?
                    (
                        <ViewContainer>
                            <SearchBarComponent title={'Pesquise suas disciplinas!'} setSearchQuery={setSearchQuery} />

                            <RadioButtonComponent
                                title={'Todas disciplinas.'}
                                id={null} selected={selectedRadio === null}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Disciplinas em andamento.'}
                                id={'STUDYING'}
                                selected={selectedRadio === 'STUDYING'}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Disciplinas aprovadas.'}
                                id={'APPROVED'}
                                selected={selectedRadio === 'APPROVED'}
                                onSelect={handleRadioSelect}
                            />

                            <RadioButtonComponent
                                title={'Disciplinas reprovadas.'}
                                id={'DISAPPROVED'}
                                selected={selectedRadio === 'DISAPPROVED'}
                                onSelect={handleRadioSelect}
                            />
                            {hasData === true && grades.length === 0
                                ?
                                (<ContainerDatasNotFound>
                                    <TextFiltersNotFound>Não existem disciplinas para esses filtros.</TextFiltersNotFound>
                                </ContainerDatasNotFound>

                                )
                                :
                                (<FlatList
                                    data={grades}
                                    renderItem={({ item }) => (
                                        <CardGrades
                                            titleGrades={item.name}
                                            status={item.dateEnd}
                                            onOFF={() => item.dateEnd === null ? showAlertOffDiscipline(item.id) : null}
                                            noteMin={item.noteMin}
                                            noteCurrent={item.note}
                                            onEdit={() => fnGoToEdit(item.id)}
                                            onDelete={() => showAlertDeleteDiscipline(item.id)}
                                            activity={() => {
                                                if (item.activity && item.activity.length > 0) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            }}
                                        />
                                    )}
                                    showsVerticalScrollIndicator={false}
                                />
                                )
                            }
                        </ViewContainer>
                    )
                    :
                    (<Fragment>
                        <Title>{DisciplinesMocks.DisciplineFiltersScreen.title}</Title>
                        <ContainerImageInitial>
                            <ResponsiveImage
                                source={DisciplinesMocks.DisciplineFiltersScreen.image.content}
                                initWidth={DisciplinesMocks.DisciplineFiltersScreen.image.width}
                                initHeight={DisciplinesMocks.DisciplineFiltersScreen.image.height}
                                resizeMode={DisciplinesMocks.DisciplineFiltersScreen.image.rezide}
                            />
                        </ContainerImageInitial>
                    </Fragment>

                    )
                }
            </ViewContainer>
        </ContentContainer>
    )
};

export default DisciplineFilters;