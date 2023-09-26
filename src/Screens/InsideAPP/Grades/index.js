import React, { useState, Fragment, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'react-native'
import { View, ViewSettings, TitleGrades, ViewBlock } from "./StylesGrades";
import { AutenticacaoContext } from "../../../Contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import CardActivies from "./ComponentsGrades/CardActiviesGrades";
import CardGrades from "./ComponentsGrades/CardGradeGrades";

const Grades = () => {
    const [grades, setGrades] = useState([]);
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const navigation = useNavigation();

    const goToAddGrade = () => {
        navigation.navigate('AddGrade');
    }

    const goToActivityFilters = () => {
        navigation.navigate('ActivityFilters');
    }

    return (
        <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: "space-between", backgroundColor: "#2aabbf" }}>
            <View>
                <ViewSettings>
                    <TouchableOpacity>
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                            onPress={goToAddGrade}
                        />
                    </TouchableOpacity>

                    <ViewBlock>
                        <TouchableOpacity>
                            <Ionicons
                                name={"options-outline"}
                                size={35}
                                color={"white"}
                                onPress={goToActivityFilters}
                            />
                        </TouchableOpacity>
                    </ViewBlock>
                </ViewSettings>

                {grades.length >= 10 ? (
                    <Fragment>
                        <TitleGrades>{`Adicione novas disciplinas, ${username}!`}</TitleGrades>
                        <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('./Grade-Image.png')}
                                style={{ width: "100%", height: "55%" }}
                                resizeMode="cover"
                            />
                        </View>
                    </Fragment>
                ) : (<CardGrades titleGrades={'Laboratorio de banco de sss'}

                    status={'APROVADO'} />)
                }
            </View>
        </SafeAreaView>
    );
}

export default Grades;