import React, { useState, useContext, useEffect, Fragment } from "react";
import { ContentContainer, ViewContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles/index";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { Image, View } from "react-native";
import { getAllDiscipline, getDisciplineByID } from "../../../../../Services/Requests/Disciplines/index.js";
import { useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import useMocks from "../../../../../Mocks/index.js";
import SpinnerComponent from "../../../../../Components/Spinner";
import CardGrades from "../../ComponentsDisciplines/CardDiscipline";
import SearchBarComponent from "../../../../../Components/SearchBar/index";
import RadioButtonComponent from "../../../../../Components/RadioButton/index";

const DisciplineFilters = () => {
    const [grades, setGrades] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const isFocused = useIsFocused(false);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchDatas() {
            try {
                const result = await getAllDiscipline(tokenJWT)
                if (result) {
                    setGrades(result)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        fetchDatas();
    }, [isFocused])

    const filterAndSearchDisciplines = () => {
        let filteredDisciplines = grades;

        if (selectedRadio === 'allDisciplines') {
            return filteredDisciplines;
        } else if (selectedRadio === 'DISAPPROVED') {
            filteredDisciplines = filteredDisciplines.filter((item) => item.status === 'DISAPPROVED');
        } else if (selectedRadio === 'APPROVED') {
            filteredDisciplines = filteredDisciplines.filter((item) => item.status === 'APPROVED');
        }

        const query = searchQuery.toLowerCase();
        if (query) {
            filteredDisciplines = filteredDisciplines.filter((item) => item.name.toLowerCase().includes(query));
        }
        return filteredDisciplines;
    }

    const handleRadioSelect = (radioId) => {
        setSelectedRadio(radioId);
    };

    const fnGoToEdit = async (idDiscipline) => {
        const result = await getDisciplineByID(tokenJWT, idDiscipline);
        console.log(result);
        if (result) {
            navigation.navigate('EditGrade', { objGrade: result });
        } else {
            console.log('Algo deu errado');
        }
    }

    return (
        <ContentContainer>
            {isLoading
                ?
                (<SpinnerComponent
                    state={isLoading}
                    text={'Carregando...'}
                />
                )
                :
                (<ViewContainer>
                    {

                        grades.length <= 0
                            ?
                            (<Fragment>
                                <Title>{`Cadastre novas atividades avaliativas para filtrar, ${username}!`}</Title>
                                
                            </Fragment>
                            )
                            :
                            (<ViewContainer>
                                <SearchBarComponent title={'Pesquise suas disciplinas!'} setSearchQuery={setSearchQuery} />

                                <RadioButtonComponent
                                    title={'Todas disciplinas.'}
                                    id={'allDisciplines'}
                                    selected={selectedRadio === 'allDisciplines'}
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

                                <FlatList
                                    data={filterAndSearchDisciplines()}
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
                            </ViewContainer>
                            )
                    }
                </ViewContainer>
                )
            }
        </ContentContainer>
    )
};

export default DisciplineFilters;