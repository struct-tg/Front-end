import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const Grades = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>

            <View style={{ flex: 0.8, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Text>Grades!</Text>
            </View>
        </SafeAreaView>
    );
}

export default Grades;