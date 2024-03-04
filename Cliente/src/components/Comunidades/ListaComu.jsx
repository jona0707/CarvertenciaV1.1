// Componente de Búsqueda y Visualización de Birgadistas

import { CustomBtn } from '../Comunes/CustomBtn'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { List, ListItem, ListItemText, Container, TextField } from '@mui/material'
import { Banner } from '../Comunes/Banner';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';



export const ListaComu = () => {

    // Estado para lista de comunidades
    const [comunidades, setComunidades] = useState([])
    const [userAdmin, setUserAdmin] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userAdmin = localStorage.getItem('userAdmin')
        setUserAdmin(userAdmin)
        axios.get("http://localhost:8000/api/carvertencia/comus", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((comus) => { setComunidades(comus.data) })
            .catch((err) => console.log(err))


    }, []);


    const nav = useNavigate();
    const handlerComNavigate = (nombre) => nav("/welcome/"+nombre)

    return (
        <>
            <Banner nombreAdmin={userAdmin} ruta={"/"}/>
            {/* Definimos un Container que albergue todo el componente */}
            <Container maxWidth={false} sx={{
                bgcolor: "secondary.main",          // Fondo de color navy blue
                color: "white",                     // letras blancas
                display: "flex",                    // usaremos flex
                flexDirection: "column",            // la direcicón del flex será vertical
                height: "100vh",                     // para que el fondo se complete
                alignItems: "center",               // items alineado al centro
                p: 2,                               // padding general de 16 pixeles
                m: 0                                // sin margen
            }}>
                {/* Titulo y subtitulo */}
                {/* Definimos un h3 en negrita, alineado al centro el título del componente */}
                <Typography variant="h3" fontWeight={"bold"} textAlign={'center'}> COMUNIDADES</Typography>

                {/* Input de búsqueda de Brigadistas*/}
                <TextField
                    placeholder="Busca Comunidades"                 // El placeholder del input
                    variant='outlined'                              // estándar para que tenga fondo
                    sx={{ bgcolor: "white", width: "30%", p: 2, mt: 2 }}   // El fondo será blanco, un ancho al 30% y padding general de 16px
                />

                {/*Lista de Brigadistas*/}
                {
                    comunidades.map((comu, idx) => {
                        return (
                            <List>
                                <ListItem> {/* Con este componente definimos un <li> */}
                                    <ListItemText key={idx} sx={{                 // definimos el estilo del texto 
                                        mx: 6,                          // margen horizontal de 48px
                                        cursor: "pointer",               // hacemos que sea botón
                                    }}
                                        primary={comu.nombreComu}   // Texto del <li>
                                        onClick={()=>handlerComNavigate(comu.nombreComu)}
                                    />
                                    <EditIcon /> {/* este componente es un icono predefinido de MUI*/}
                                    <DeleteIcon />
                                </ListItem>

                            </List>
                        )
                    })


                }

                {/* Se tiene el componete botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}
                <CustomBtn texto={"AGREGRAR COMUNIDAD"} ruta={"/comunidades/new"} />

            </Container >
        </>
    )
}

