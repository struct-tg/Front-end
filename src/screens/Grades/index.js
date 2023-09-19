import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'react-native'
import { View, ViewSettings } from "./StylesGrades";
import { Ionicons } from "@expo/vector-icons";
import CardActivies from "./ComponentsGrades/CardActiviesGrades";
import CardGrades from "./ComponentsGrades/CardGradeGrades";

const Grades = () => {
    const [grades, setGrades] = useState(1);

    const navigation = useNavigation();

    const goToAddGrade = () => {
        navigation.navigate('AddGrade');
    }

    return (
        <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: "center", backgroundColor: "#2aabbf" }}>
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

                    <TouchableOpacity>
                        <Ionicons
                            name={"search-circle-outline"}
                            size={35}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </ViewSettings>

                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('./Grade-Image.png')}
                        style={{ width: "100%", height: "55%" }}
                        resizeMode="cover"
                    />
                </View> 
            </View>
        </SafeAreaView>
    );
}

export default Grades;