// Componente de Búsqueda y Visualización de Birgadistas

import { CustomBtn } from '../Comunes/CustomBtn'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { List, ListItem, ListItemText, Container, TextField, Link, Avatar } from '@mui/material'
import { Banner } from '../Comunes/Banner'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



export const ListaPro = () => {

    const nav = useNavigate()
    const handlerEdit = () => nav("/brigadistas/edit")
    const { comunidad } = useParams();

    const [propietarios, setPropietarios] = useState([])
    const [userAdmin, setUserAdmin] = useState("")
    const [nombrePropietarios, setNombrePropietarios] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userAdmin = localStorage.getItem('userAdmin');
        setUserAdmin(userAdmin);

        axios.get("http://localhost:8000/api/carvertencia/buscarcomu/" + comunidad, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((props) => {
                setPropietarios(props.data.propietariosComu);

                // Luego de obtener los IDs de los brigadistas, realizamos una llamada para obtener sus nombres
                const requests = props.data.propietariosComu.map(prop => {
                    return axios.get("http://localhost:8000/api/carvertencia/prop/" + prop, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                });

                Promise.all(requests)
                    .then(responses => {
                        const nombres = responses.map(response => response.data.nombreProp);
                        setNombrePropietarios(nombres);
                        console.log(nombrePropietarios)
                    })
                    .catch(error => {
                        console.error("Error al obtener lsos nombres de los propietarios:", error);
                    });
            })
            .catch((err) => {
                console.error("Error al obtener los brigadistas:", err);
            });
    }, []);



    return (
        <>
            <Banner ruta={"/welcome/" + comunidad} nombreAdmin={userAdmin} />
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
                <Typography variant="h3" fontWeight={"bold"} textAlign={'center'}> PROPIETARIOS</Typography>
                {/* Definimos un h4 en letra más fina, alineado al centro Fque muestra la comunidad  */}
                <Typography variant="h4" fontWeight={"light"} textAlign={'center'}>{comunidad}</Typography>

                {/* Input de búsqueda de Autommóvil*/}
                <TextField
                    placeholder="Buscar Propietario"                 // El placeholder del input
                    variant='outlined'                              // estándar para que tenga fondo
                    sx={{ bgcolor: "white", width: "30%", p: 2 }}   // El fondo será blanco, un ancho al 30% y padding general de 16px
                />

                {/*Lista de Automóvil*/}
                {
                    nombrePropietarios.map((prop, idx) => {
                        return (

                            <List>
                                <ListItem key={idx}> {/* Con este componente definimos un <li> */}
                                    <Avatar />
                                    <ListItemText sx={{                 // definimos el estilo del texto 
                                        mx: 6,                          // margen horizontal de 48px
                                    }}
                                        primary={prop}   // Texto del <li>
                                    />
                                    <MoreVertIcon /> {/* este componente es un icono predefinido de MUI*/}
                                </ListItem>

                            </List>
                        )
                    })
                }

                {/* Se tiene el componete botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}
                <CustomBtn texto={"AGREGAR Propietario"} ruta={"/propietarios/new"} />

                {/* La opción para seleccionar otra comunidad */}
                <Link href="/comunidades" sx={{ color: "white", fontSize: 10, mt: 5 }}><u>O selecciona de otra comunidad</u></Link>

            </Container>
        </>
    )
}

