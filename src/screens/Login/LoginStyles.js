import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#168B9D",
        padding: 24,
    },
    view: {
        flex: 0.7,
        justifyContent: "space-around",
        textAlign: "center"
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
    },
    block: {
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    navigators: {
        color: "white",
        
    }
})