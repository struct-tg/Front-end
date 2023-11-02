import React, { useState, useEffect, useContext, Fragment } from "react";
import { Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getAllActivity } from "../../../../../../Services/Requisicoes/Activity/activity-service.js";
import { AutenticacaoContext } from "../../../../../../Contexts/UserContext.js";
import { ContentContainer, ViewContainer, ViewSettings, ViewBlock, ContainerImageInitial, Title } from "../../../../../../Styles/DefaultStyles/index.js";
import { Ionicons } from "@expo/vector-icons";
import SpinnerComponent from "../../../../../../Components/Spinner/index.js";

const Activity = ({ route }) => {
    const [activitys, setActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const { SelectId } = route.params;

    useEffect(() => {
        async function fetchActivitys() {
            try {
                const result = await getAllActivity(tokenJWT, SelectId.id)
                if (result) {
                    setActivity(result)
                } else {
                    console.log("nada aqui irmão")
                }
            }
            catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchActivitys();
    }, [isFocused])


    const navigation = useNavigation();


    return (
        <ContentContainer>
            <ViewContainer>
                <ViewSettings>
                    <TouchableOpacity>
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                            onPress={() => navigation.navigate('AddActivity', {entidadeId: SelectId})}
                        />
                    </TouchableOpacity>

                    <ViewBlock>
                        <TouchableOpacity>
                            <Ionicons
                                name={"options-outline"}
                                size={35}
                                color={"white"}
                                onPress={() => console.log('rotas')}
                            />
                        </TouchableOpacity>
                    </ViewBlock>
                </ViewSettings>

                {isLoading
                    ?
                    (
                        <SpinnerComponent state={isLoading} text={'Carregando...'} />
                    )
                    : activitys.length <= 0
                        ?
                        (<Fragment>
                            <Title>{`Adicione novas atividades em ${SelectId.name}, ${username}!`}</Title>
                                <ContainerImageInitial>
                                    <Image
                                        source={require('./Activity-List-Image.png')}
                                        style={{ width: "100%", height: "55%" }}
                                        resizeMode="cover"
                                    />
                                </ContainerImageInitial>
                        </Fragment>
                        )
                        :
                        (
                            <FlatList
                                data={activitys}
                                renderItem={({ item }) => (
                                    <CardComponent />
                                )}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        )
                }
            </ViewContainer>
        </ContentContainer >
    );
}

export default Activity;