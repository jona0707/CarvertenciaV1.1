import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";

import Home from "../../resources/home.png"
import ENVIAR from "../../resources/Enviar.png"

const Reporte = ({ navigation }) => {

    const handleHome = (e) => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>REPORTA UN INCIDENTE</Text>
            <Text style={styles.subtitle}>INGRESA LA PLACA</Text>
            <TextInput
                style={styles.input}
                placeholder="AAA-123"
            />
            <Text style={styles.subtitle}>INGRESA EL INCIDENTE</Text>
            <TextInput
                style={styles.inputT}
                multiline
            />
            <TouchableOpacity>
                <Image style={styles.button} source={ENVIAR} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleHome} >
                <Image source={Home} style={styles.home}></Image>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%",
        backgroundColor: "#6d2829"
    },
    title: {
        color: "#ffefd3",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 75
    },
    subtitle: {
        color: "#ffefd3",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 5
    },
    input: {
        backgroundColor: "white",
        width: "80%",
        height: "7%",
        paddingHorizontal: 10,
        borderRadius: 50,
        marginTop: 5,
        marginBottom: 10,
        borderColor: "#801617",
        borderWidth: 5,
        fontSize: 15,
    },
    inputT: {
        backgroundColor: "white",
        width: "80%",
        height: "30%",
        paddingHorizontal: 5,
        borderRadius: 50,
        marginTop: 5,
        borderColor: "#801617",
        borderWidth: 5,
        fontSize: 15,
    },
    button: {
        height: 150,
        width: 150,
    },
    home: {
        height: 75,
        width: 75,
    }
});


export default Reporte;