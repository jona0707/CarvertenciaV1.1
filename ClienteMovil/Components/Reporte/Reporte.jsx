import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import axios from "axios";

import Home from "../../resources/home.png";
import ENVIAR from "../../resources/Enviar.png";

// Importa el contexto
import AppContext from "../../Context/AppContext";

const Reporte = ({ navigation }) => {
    // Obtén el token del contexto
    const { token } = useContext(AppContext);

    // Define el estado local para la placa y la descripción
    const [placaRep, setPlacaRep] = useState("");
    const [descripcionRep, setDescripcionRep] = useState("");

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const handleSubmit = () => {
        // Verifica si los campos están vacíos
        if (!placaRep.trim() || !descripcionRep.trim()) {
            Alert.alert("Error", "Por favor ingresa la placa y la descripción del incidente.");
            return;
        }

        // Realiza la solicitud POST al servidor con el token
        axios.post('http://192.168.100.103:8000/api/carvertencia/newreporte', {
            placaRep: placaRep,
            descripcionRep: descripcionRep
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // Muestra un mensaje de éxito
            Alert.alert("Reporte Enviado", "El reporte ha sido enviado exitosamente.");
            // Reinicia los campos
            setPlacaRep("");
            setDescripcionRep("");
        })
        .catch(error => {
            // Muestra un mensaje de error
            Alert.alert("Error", "Ocurrió un error al enviar el reporte. Por favor intenta de nuevo.");
            console.error(error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>REPORTA UN INCIDENTE</Text>
            <Text style={styles.subtitle}>INGRESA LA PLACA</Text>
            <TextInput
                style={styles.input}
                placeholder="AAA1234"
                value={placaRep}
                onChangeText={text => setPlacaRep(text.toUpperCase())}
            />
            <Text style={styles.subtitle}>INGRESA EL INCIDENTE</Text>
            <TextInput
                style={styles.inputT}
                multiline
                placeholder="Descripción del incidente"
                value={descripcionRep}
                onChangeText={text => setDescripcionRep(text)}
            />
            <TouchableOpacity onPress={handleSubmit}>
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