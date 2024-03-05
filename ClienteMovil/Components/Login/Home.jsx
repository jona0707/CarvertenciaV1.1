import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import axios from "axios";
//
import Validar from "../../resources/validar.png"
import Incidente from "../../resources/incidente.png"
import Photo from "../../resources/pfp.png"
import Registro from "../../resources/Registro.png"
//contexto
import AppContext from "../../Context/AppContext";
import React, { useContext } from "react";

const Home = ({ navigation }) => {
    const { loggedIn,Token } = useContext(AppContext);
    const handleValidate = (e) => {
        navigation.navigate('Validate');
    };
    const handleIncident = (e) => {
        navigation.navigate('Reporte')
    }
    const handleHome = (e) => {
        navigation.goBack();
    }
    const handleRegistro = (e) =>{
        navigation.navigate("Historial");
    }

    return (
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Hola  </Text>
                <Text style={styles.welcomeTextBold}>{loggedIn}</Text>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={handleHome}>
                        <Image source={Photo} style={styles.logo}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleValidate}>
                    <Image source={Validar} style={styles.imagen} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIncident}>
                    <Image source={Incidente} style={styles.imagen} />
                </TouchableOpacity>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height:"100%"
    },
    welcomeContainer: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#6d2829",
        paddingTop: 40,
        paddingVertical: 10,
        width: "100%",
        height:"15%",
    },
    welcomeText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20
    },
    welcomeTextBold: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    imageContainer: {
        flexDirection: 'row',
        marginLeft:150
    },
    buttonsContainer: {
        flexDirection: 'colum',
        alignItems: 'center',
        backgroundColor: "#002c6f",
        width: "100%",
        height:"85%"
    },
    imagen: {
        width: 250,
        height: 250,
        marginTop: 50
    },
    logo: {
        width: 50,
        height: 50,
        marginRight:8
    }
});

export default Home;