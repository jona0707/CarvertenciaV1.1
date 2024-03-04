// Componente Register que muestra los inputs para inciar sesión o registrarse

import { Container, Typography, TextField, Link, Button } from '@mui/material'
import { CustomBtn } from '../Comunes/CustomBtn'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FormControl } from '@mui/base/FormControl';

export const Register = () => {

    // creamos estados para controlar el Login del usuario
    const [emailAdmin, setEmail] = useState("");
    const [passAdmin, setPassword] = useState("");
    const [error, setError] = useState("");

    // variable para la navegación
    const navigate = useNavigate()


    let token = null; // Variable para almacenar el token de navegación
    let userAdmin = null; // Variable para almacenar el token de navegación

    // función para manejar el login
    const handleLogin = (e) => {
        console.log(emailAdmin,passAdmin)
        e.preventDefault();
        axios.post('http://localhost:8000/api/carvertencia/loginadmin', { emailAdmin, passAdmin}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                userAdmin = response.data.userAdmin;
                token = response.data.token;
                localStorage.setItem('userAdmin', userAdmin);
                localStorage.setItem('token', token);
                navigate('/comunidades')
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response.data);
                setError(err.response.data.message);
            });
    };



    return (
        <>
            {/* Container para todo el componente */}
            <Container maxWidth={false} sx={{ // con maxWidth = false hacemos que no haya un ancho maximo, sino que ocupe toda la página
                bgcolor: "secondary.main",    // fondo del color secundario de theme   
                color: "white",               // letras blancas
                display: "flex",              // organizado con flex
                flexDirection: "column",      // flex en columna
                alignItems: "center",         // items alineados al centro
                textAlign: "center",          // texto también alineado al centro
                padding: "0 20rem",           // padding horizontal de 20rem
                height: "100vh"               // para que el fondo se complete
            }}>
                {/* Titulo y Descripción */}
                {/* Titulo en h2, con etiqueta de underlie, alineado a la izquierda y en negrita */}
                <Typography variant="h2" fontWeight={"bold"} textAlign={"left"}> <u>ADMINISTRADOR</u></Typography>
                {/* Descripción en h4 con letra más fina, margen horizontal de 28rem y vertical de 1rem y alineado a la izquierda */}
                <Typography variant="h4" fontWeight={"light"} margin={"1rem 28rem"} textAlign={"left"} > Regístrate o Inicia Sesión para cuidar de tu comunidad!</Typography>


                {/* Inputs para ingresar username y password */}
                <form onSubmit={handleLogin}>
                    <Container sx={{ mb: "2rem" }}>
                        <Typography margin={"1rem 0"} variant="body1">Ingresa tu usuario</Typography>
                        <TextField margin={"1rem 0"} type="email" value={emailAdmin} name={"emailAdmin"} placeholder="username" sx={{ bgcolor: "white" }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }

                            }
                        />

                        <Typography margin={"1rem 0"} variant="body1">Ingresa tu contraseña</Typography>
                        <TextField margin={"1rem 0 2rem"} type="password" value={passAdmin} name='passAdmin' placeholder="password" sx={{ bgcolor: "white" }}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }
                            }
                        />
                        <p>{error}</p>
                    </Container>

                    {/* Componente Botón Custommizable  */}
                    {/* Añadimos una ruta cuando de clic en el botón */}
                    <Button type='submit' bgcolor='primary.main' variant='contained' >INGRESA </Button>
                </form>

                {/* Container para opciones adicionales */}
                <Container sx={{ mt: "2rem" }}>
                    <Link href="#" sx={{ color: "white", fontSize: 10 }}> <u>¿Haz olvidado tu contraseña?</u></Link>
                    <Typography variant="body2" fontSize={10} sx={{ marginBottom: "10rem" }}>
                        Revisa los términos y condiciones <Link href="#" sx={{ color: "white", fontSize: 10 }}> <u>aquí</u></Link>
                    </Typography>
                </Container>
            </Container>
        </>
    )
}
