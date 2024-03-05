// Componente de Búsqueda y Visualización de Birgadistas

import { CustomBtn } from '../Comunes/CustomBtn'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { List, ListItem, ListItemText, Container, TextField, Link } from '@mui/material'
import { Banner } from '../Comunes/Banner';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ListaBrig = () => {
    const nav = useNavigate()
    const handlerEdit = () => nav("/brigadistas/edit")
    const { comunidad } = useParams();

    const [brigadistas, setBrigadistas] = useState([])
    const [userAdmin, setUserAdmin] = useState("")
    const [nombreBrigadistas, setNombreBrigadistas] = useState([])
    const [avatar, setAvatar] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userAdmin = localStorage.getItem('userAdmin');
        setUserAdmin(userAdmin);

        axios.get("http://localhost:8000/api/carvertencia/buscarcomu/" + comunidad, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((brigs) => {
                setBrigadistas(brigs.data.brigComu);
                console.log(brigs.data.brigComu)

                // Luego de obtener los IDs de los brigadistas, realizamos una llamada para obtener sus nombres
                const requests = brigs.data.brigComu.map(brig => {
                    return axios.get("http://localhost:8000/api/carvertencia/brig/" + brig, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                });

                Promise.all(requests)
                    .then(responses => {
                        const nombres = responses.map(response => response.data.userBrig);
                        const avatar = responses.map(response => {
                            // Decodificar la cadena Base64 del avatar
                            const decodedAvatar = atob(response.data.avatarBrig);
                            return decodedAvatar;
                        }); setNombreBrigadistas(nombres);
                        setAvatar(avatar)
                        console.log(nombreBrigadistas)
                    })
                    .catch(error => {
                        console.error("Error al obtener los nombres de los brigadistas:", error);
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
                <Typography variant="h3" fontWeight={"bold"} textAlign={'center'}> BRIGADISTAS</Typography>
                {/* Definimos un h4 en letra más fina, alineado al centro Fque muestra la comunidad  */}
                <Typography variant="h4" fontWeight={"light"} textAlign={'center'}> {comunidad}</Typography>

                {/* Input de búsqueda de Brigadistas*/}
                <TextField
                    placeholder="Busca Brigadistas"                 // El placeholder del input
                    variant='outlined'                              // estándar para que tenga fondo
                    sx={{ bgcolor: "white", width: "30%", p: 2 }}   // El fondo será blanco, un ancho al 30% y padding general de 16px
                />

                {/*Lista de Brigadistas*/}
                {
                    nombreBrigadistas.map((brig, idx) => {
                        return (
                            <List key={idx}> {/* Asegúrate de agregar una clave única a cada elemento de la lista */}
                                <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}> {/* Con este componente definimos un <li> */}
                                    <img src={avatar[idx]} style={{ width: "50px", height: "auto", marginRight: 5 }} /> {/* Ajusta el ancho de la imagen según sea necesario */}
                                    <ListItemText primary={brig} sx={{ flex: "1" }} /> {/* Ajusta el contenido del texto */}
                                    <MoreVertIcon sx={{ cursor: "pointer" }} onClick={handlerEdit} /> {/* este componente es un icono predefinido de MUI*/}
                                </ListItem>
                            </List>
                        )
                    })
                }


                {/* Se tiene el componete botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}
                <CustomBtn texto={"AÑADIR BRIGADISTA"} ruta={"/brigadistas/new"} />

                {/* La opción para seleccionar otra comunidad */}
                <Link href="/comunidades" sx={{ color: "white", fontSize: 10, mt: 5 }}><u>O selecciona de otra comunidad</u></Link>

            </Container>
        </>
    )
}

