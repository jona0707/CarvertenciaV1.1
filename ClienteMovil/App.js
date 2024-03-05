import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Componentes 
import Login from './Components/Login/Login'
import Home from './Components/Login/Home'
import Validate from './Components/Validar/Validate.jsx'
import Reporte from './Components/Reporte/Reporte';
//contexto
import AppContext from './Context/AppContext'
import React, { useState } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>
      <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ title: "Brigadista", headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ title: "Inicio", headerShown: false }} />
          <Stack.Screen name="Validate" component={Validate} options={{ title: "Validar", headerShown: false }} />
          <Stack.Screen name="Reporte" component={Reporte} options={{ title: "Reporte", headerShown: false }} />
        </Stack.Navigator>

      </NavigationContainer>
    </AppContext.Provider>
  );
}

