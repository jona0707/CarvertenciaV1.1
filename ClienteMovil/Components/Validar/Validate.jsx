import React, { useEffect, useRef, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { CameraView, Camera, CameraType } from 'expo-camera/next';
import axios from "axios";

import Atras from "../../resources/atras.png";
//contexto
import AppContext from "../../Context/AppContext";


const Validate = ({ navigation }) => {
    const { token } = useContext(AppContext);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [type, setType] = useState("back");
    const camera = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        const qrData = data.split("\n");
        const id_ = qrData[0].split(": ")[1];
        const placa_ = qrData[1].split(": ")[1];
        console.log(id_);
        console.log(placa_);

        // Realizar la solicitud al servidor para validar el vehículo
        axios.post('http://192.168.100.103:8000/api/carvertencia/validarqr', { id:id_, placa:placa_ }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluir token de autenticación
            }
        })
            .then(response => {
                const { modelo, comunidad } = response.data;

                // Mostrar alerta con la información obtenida del servidor
                Alert.alert(
                    "Vehículo Validado",
                    `Placa: ${placa_}\nModelo: ${modelo}\nComunidad: ${comunidad}`,
                    [
                        { text: "OK", onPress: () => setScanned(false) }, // Resetea el scanner para otro 
                        { text: "Reportar Incidente", onPress: () => navigation.navigate('Reporte') },
                    ]
                );
            })
            .catch(error => {
                console.error(error);
                Alert.alert("Error", "Ocurrió un error al validar el vehículo");
                setScanned(false);
            });
    };


    const handleHome = () => {
        navigation.goBack();
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} type={type} ref={camera}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeScannerSettings={{
                    barCodeTypes: ["qr"],
                }}>
                <View style={styles.overlay}>
                    <View style={styles.rectangle}></View>
                </View>
                <TouchableOpacity onPress={handleHome}>
                    <Image source={Atras} style={styles.atras} />
                </TouchableOpacity>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    atras: {
        marginTop: 25,
        width: 65,
        height: 65,
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    rectangle: {
        borderWidth: 5,
        borderColor: "white",
        width: 300,
        height: 300,
        opacity: 0.6,
    },
});

export default Validate;