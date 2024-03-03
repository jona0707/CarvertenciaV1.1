// Componente de Búsqueda y Visualización de Birgadistas

import { CustomBtn } from '../Comunes/CustomBtn'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { List, ListItem, ListItemText, Avatar, Container, TextField, Link } from '@mui/material'
import { Banner } from '../Comunes/Banner';
import { useNavigate } from 'react-router-dom';

export const ListaBrig = () => {
    const nav = useNavigate()
    const handlerEdit = () => nav("/brigadistas/edit")
    return (
        <>
        <Banner ruta={"/welcome"}/>
            {/* Definimos un Container que albergue todo el componente */}
            <Container maxWidth={false} sx={{
                bgcolor: "secondary.main",          // Fondo de color navy blue
                color: "white",                     // letras blancas
                display: "flex",                    // usaremos flex
                flexDirection: "column",            // la direcicón del flex será vertical
                height:"100vh",                     // para que el fondo se complete
                alignItems: "center",               // items alineado al centro
                p: 2,                               // padding general de 16 pixeles
                m: 0                                // sin margen
            }}>
                {/* Titulo y subtitulo */}
                {/* Definimos un h3 en negrita, alineado al centro el título del componente */}
                <Typography variant="h3" fontWeight={"bold"} textAlign={'center'}> BRIGADISTAS</Typography>
                {/* Definimos un h4 en letra más fina, alineado al centro Fque muestra la comunidad  */}
                <Typography variant="h4" fontWeight={"light"} textAlign={'center'}> COMUNIDAD B</Typography>

                {/* Input de búsqueda de Brigadistas*/}
                <TextField
                    placeholder="Busca Brigadistas"                 // El placeholder del input
                    variant='outlined'                              // estándar para que tenga fondo
                    sx={{ bgcolor: "white", width: "30%", p: 2 }}   // El fondo será blanco, un ancho al 30% y padding general de 16px
                />

                {/*Lista de Brigadistas*/}
                <List>
                    <ListItem> {/* Con este componente definimos un <li> */}
                        <Avatar />  {/* este componente es un avatar predefinido de MUI*/}
                        <ListItemText sx={{                 // definimos el estilo del texto 
                            mx: 6,                          // margen horizontal de 48px
                        }}
                            primary="Nombre Brigadista A"   // Texto del <li>
                        />
                        <MoreVertIcon sx={{cursor: "pointer"}} onClick={handlerEdit} /> {/* este componente es un icono predefinido de MUI*/}
                    </ListItem>
                    <ListItem>
                        <Avatar />
                        <ListItemText sx={{
                            mx: 6,
                        }}
                            primary="Nombre Brigadista B"
                        />
                        <MoreVertIcon sx={{cursor: "pointer"}} onClick={handlerEdit} />
                    </ListItem>
                    <ListItem>
                        <Avatar />
                        <ListItemText sx={{
                            mx: 6,
                        }}
                            primary="Nombre Brigadista C"
                        />
                        <MoreVertIcon sx={{cursor: "pointer"}} onClick={handlerEdit} />
                    </ListItem>
                </List>

                {/* Se tiene el componete botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}
                <CustomBtn texto={"AÑADIR BRIGADISTA"} ruta={"/brigadistas/new"}/>

                {/* La opción para seleccionar otra comunidad */}
                <Link href="/comunidades" sx={{ color: "white", fontSize: 10, mt: 5 }}><u>O selecciona de otra comunidad</u></Link>

            </Container>
        </>
    )
}

