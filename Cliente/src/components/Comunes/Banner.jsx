// Componente Banner que se muestra en varias interfaces

import { useNavigate } from "react-router-dom";
import car from '../../resources/carLogo.png'
import { Avatar, Container, Typography } from '@mui/material'

export const Banner = ({ruta}) => {
    const nav = useNavigate();
    const handleRoute = () => nav(ruta)
    return (
        <>
            {/* Container para el componente */}
            <Container maxWidth={false} sx={{       // con maxWidth = false hacemos que no haya un ancho maximo, sino que ocupe toda la página
                bgcolor: "primary.main",            // tendrá un color de fondo vino
                color: "white",                     // letras blancas
                display: "flex",                    // display flex para una mejor organización
                justifyContent: "space-between",    // la justificación será space-between
                alignItems: "center",               // items alineados al centro
                p: 2,                               // padding general de 16px
                m: 0                                // margen general de 0px
            }}>
                <Container sx={{                // este Container tendrá el logo de la App y el saludo al admin oportuno
                    display: "flex",            // se organiza mediante flex
                    alignItems: "center", 
                    ml:0                        // se alinean al centro los items
                }}>
                    {/* Se agrega la imágen previamente importada al componente desde resources */}
                    
                    <img src={car} alt="Logo" width={"8%"} style={{ marginRight: "1rem", cursor: "pointer" }} onClick={handleRoute} />

                    {/* Se agrega el saludo al admin con Typography de MUI, &nbsp sirve para agregar un espacio */}
                    <Typography variant="body1" color="white"> Hola&nbsp;<u>nombre Admin</u>!</Typography>

                </Container>

                {/* Se agrega el componente Avatar de MUI  */}
                <Avatar />
            </Container>
        </>
    )
}
