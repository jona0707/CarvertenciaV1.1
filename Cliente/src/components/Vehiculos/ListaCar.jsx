// Componente de Búsqueda y Visualización de Birgadistas

import { CustomBtn } from '../Comunes/CustomBtn'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Button, List, ListItem, ListItemText, Container, TextField, Link } from '@mui/material'
import { Banner } from '../Comunes/Banner'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export const ListaCar = () => {


    const nav = useNavigate()
    const { comunidad } = useParams();

    const [autos, setAutos] = useState([])
    const [userAdmin, setUserAdmin] = useState("")
    const [nombreAutos, setNombreAutos] = useState([])
    const [placa, setPlaca] = useState([])
    const [color, setColor] = useState([])
    const [carID, setCarID] = useState("")


    const handleNew = () => nav(`/${comunidad}/autos/new`)
    const handleQR = () => nav(`/${comunidad}/${carID}/qr`)

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userAdmin = localStorage.getItem('userAdmin');
        const id = localStorage.getItem('carID')
        setUserAdmin(userAdmin);
        setCarID(id);

        axios.get("http://localhost:8000/api/carvertencia/buscarcomu/" + comunidad, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((cars) => {
                setAutos(cars.data.autosComu);
                console.log(cars.data.autosComu)

                // Luego de obtener los IDs de los brigadistas, realizamos una llamada para obtener sus nombres
                const requests = cars.data.autosComu.map(car => {
                    return axios.get("http://localhost:8000/api/carvertencia/auto/" + car, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                });

                Promise.all(requests)
                    .then(responses => {
                        const nombres = responses.map(response => response.data.modeloAuto);
                        const placas = responses.map(response => response.data.placaAuto);
                        const color = responses.map(response => response.data.colorAuto);
                        setNombreAutos(nombres);
                        setPlaca(placas)
                        setColor(color)
                        console.log(responses) 
                        console.log(placas)
                    })
                    .catch(error => {
                        console.error("Error al obtener autos:", error);
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
                <Typography variant="h3" fontWeight={"bold"} textAlign={'center'}> AUTOMÓVILES</Typography>
                {/* Definimos un h4 en letra más fina, alineado al centro Fque muestra la comunidad  */}
                <Typography variant="h4" fontWeight={"light"} textAlign={'center'}> {comunidad} </Typography>

                {/* Input de búsqueda de Autommóvil*/}
                <TextField
                    placeholder="Buscar Automóvil"                 // El placeholder del input
                    variant='outlined'                              // estándar para que tenga fondo
                    sx={{ bgcolor: "white", width: "30%", p: 2 }}   // El fondo será blanco, un ancho al 30% y padding general de 16px
                />

                {/*Lista de Automóvil*/}
                {
                    nombreAutos.map((car, idx) => {
                        return (
                            <List key={idx}> {/* Asegúrate de agregar una clave única a cada elemento de la lista */}
                                <ListItem
                                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}> {/* Con este componente definimos un <li> */}
                                    <ListItemText
                                        primary={`${car.toUpperCase()} - ${color[idx]}`}
                                        secondary={placa[idx]}
                                        sx={{ mx: 6, '& .MuiListItemText-secondary': { color: '#cccccc' } }} /> {/* Estilo del texto y contenido del ListItemText */}
                                    <InfoIcon sx={{ cursor: "pointer" }} />
                                    <EditIcon sx={{ cursor: "pointer" }} />
                                    <DeleteIcon sx={{ cursor: "pointer" }} />
                                    <QrCodeIcon sx={{ cursor: "pointer" }} onClick={()=>handleQR()}/>

                                </ListItem>
                            </List>
                        )
                    })
                }


                {/* Se tiene el componete botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}
                <Button bgcolor='primary.main' variant='contained' onClick={()=>handleNew()}>AGREGAR AUTOMÓVIL</Button>

                {/* La opción para seleccionar otra comunidad */}
                <Link href="/comunidades" sx={{ color: "white", fontSize: 10, mt: 5 }}><u>O selecciona de otra comunidad</u></Link>

            </Container>
        </>
    )
}

