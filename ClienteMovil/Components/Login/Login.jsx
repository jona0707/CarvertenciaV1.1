import React from "react";
import { useState, useEffect,useContext } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import Logo from "../../resources/carLogo.png"
import INGRESA from "../../resources/Ingresa.png"
//contexto
import AppContext from "../../Context/AppContext";

const UserLogin = ({ navigation }) => {
    const { setLoggedIn, setToken } = useContext(AppContext); //acceder a los valores del provider
    
    const [emailBrig, setEmail] =useState("");
    const [passBrig, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = () => {
        axios
            .post('http://192.168.100.103:8000/api/carvertencia/loginbrig', { emailBrig, passBrig }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                const { token, userBrig } = response.data;
                setToken(token); // almacenar el token en el estado global
                setLoggedIn(userBrig); // almacenar el usuario en el estado global
                navigation.navigate('Home', { token, userBrig }); // envío el token mediante navigation
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BRIGADISTA</Text>
            <Text style={styles.label}>Ingresa tu correo</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo"
                onChangeText={(text) => setEmail(text.toLowerCase())}
                value={emailBrig.toLowerCase()} 
            />
            <Text style={styles.label}>Ingresa tu contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={passBrig}
                secureTextEntry
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={handleLogin} >
                <Image style={styles.button} source={INGRESA} />
            </TouchableOpacity>
            <Text style={styles.forgot}>¿Haz olvidado tu contraseña?</Text>
            <Text style={styles.link}>Revisa los términos y condiciones aquí.</Text>
            <Image source={Logo} style={styles.logo}></Image>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#002c6f",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 33,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
        borderBottomWidth: 2,
        borderBottomColor: "white",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: 'white'
    },
    input: {
        borderColor: "#6d2829",
        borderWidth: 3,
        width: "80%",
        marginBottom: 10,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 50,
    },
    forgot: {
        fontSize: 14,
        marginBottom: 5,
        color: "white",
        borderBottomWidth: 1,
        borderBottomColor: "white",
    },
    link: {
        fontSize: 14,
        color: "white",
        borderBottomWidth: 1,
        borderBottomColor: "white",
    },
    button: {
        height: 150,
        width: 150
    },
    logo: {
        width: 200,
        height: 200,
    }
});

export default UserLogin;