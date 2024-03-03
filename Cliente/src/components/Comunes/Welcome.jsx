// Componente Register que muestra los inputs para inciar sesión o registrarse

import { Container, Typography } from '@mui/material'
import { Banner } from './Banner'
import cars from "../../resources/adminCar.png"
import brigs from "../../resources/adminBrig.png"
import owners from "../../resources/adminProp.png"
import { useNavigate } from 'react-router-dom'



export const Welcome = () => {
    const nav = useNavigate()
    const handleBrigs = () => nav("/brigadistas")
    const handleOwns = () => nav("/propietarios")
    const handleCars = () => nav("/autos")

    return (
        <>
            <Banner ruta={"/comunidades"} />
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
                <Typography sx={{mt:2}} variant="h2" fontWeight={"bold"} textAlign={"center"}> COMUNIDAD B</Typography>

                {/* Inputs para ingresar username y password */}
                <Container sx={{ my: "2rem" }}>
                    <img src={brigs} alt="Administración de brigadistas" style={{ width: "20%", cursor: "pointer", gap:"1rem" }} onClick={handleBrigs} />
                    <img src={owners} alt="Administración de propietarios" style={{ width: "20%", cursor: "pointer" }} onClick={handleOwns}/>
                    <br/>
                    <img src={cars} alt="Administración de autos" style={{ width: "20%", cursor: "pointer" }} onClick={handleCars}/>

                </Container>


            </Container>
        </>
    )
}
