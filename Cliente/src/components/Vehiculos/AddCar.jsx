// Componente para añadir un Carro

import { Button, Container, Typography, TextField, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react';
import { CustomBtn } from '../Comunes/CustomBtn'
import { Banner } from '../Comunes/Banner'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export const AddCar = () => {

    const nav = useNavigate()

    const [color, setColor] = useState('');
    const [dueno, setDueno] = useState([]);
    const [year, setYear] = useState()
    const [marca, setMarca] = useState("")
    const [placa, setPlaca] = useState([])
    const [carID, setCarID] = useState("")
    const [comuID, setComuID] = useState("")


    const { comunidad } = useParams();

    const [userAdmin, setUserAdmin] = useState("")

    const handleYearChange = (e) => {
        setYear(e.target.value)
        console.log(e.target.value)
    }
    const handleMarcaChange = (e) => {
        setMarca(e.target.value)
        console.log(e.target.value)
    }
    const handlePlacaChange = (e) => {
        setPlaca(e.target.value)
        console.log(e.target.value)
    }
    const handleColorChange = (e) => {
        setColor(e.target.value);
        console.log(e.target.value)
    }
    const handleDuenoChange = (e) => {
        setDueno(e.target.value);
        console.log(e.target.value)
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userAdmin = localStorage.getItem('userAdmin');
        setUserAdmin(userAdmin);

        axios.get("http://localhost:8000/api/carvertencia/buscarcomu/" + comunidad, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                const comuID = res.data._id;
                setComuID(comuID)
                console.log(comuID)

            })
    }, []);



    const handleAdd = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        axios.post(
            "http://localhost:8000/api/carvertencia/newauto",
            {
                placaAuto: placa,
                modeloAuto: marca,
                anioAuto: year,
                colorAuto: color,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
            .then((res) => {
                console.log(res);
                nav(`/${comunidad}/autos/`);
                const id = res.data._id;
                setCarID(id);
                console.log(id);
                console.log(carID);
                localStorage.setItem("carID", id) 

                // Hacer el segundo axios con addautocomu
                const secondPromise = axios.post(
                    "http://localhost:8000/api/carvertencia/addautocomu/",
                    {
                        idComunidad: comuID,
                        idAuto: id // Usando el id obtenido del primer axios
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );

                return Promise.all([secondPromise]);
            })
            .then((responses) => {
                // Manejar las respuestas de las solicitudes
                console.log("Respuestas:", responses);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };




    return (
        <>
            <Banner ruta={"/"+comunidad + "/autos"} nombreAdmin={userAdmin} />
            <Container maxWidth={false} sx={{   // con sx podemos manejar varios estilos de CSS de manera más simple 
                bgcolor: "secondary.main",      // definimos el color secundario, que es una especie de navy blue
                color: "white",                 // la letra será azul
                display: "flex",                // Hacemos un display flex para que se organice mejor los elementos hijos 
                flexDirection: "column",        // la dirección del flex es vertical
                alignItems: "center",           // alineamos los items al centro
            }}>
                {/* Titulo y subtitulo */}
                {/* Definimos un h3 en negrita, alineado al centro el título del componente */}
                <Typography variant="h3" fontWeight={"bold"} textAlign={'center'} marginTop={5}> AÑADE UN AUTOMÓVIL</Typography>
                {/* Definimos un h4 en letra de ancho normal, alineado al centro que muestra la comunidad  */}
                <Typography variant="h4" textAlign={'center'}>{comunidad}</Typography>

                {/* En este Container se tendrán los inputs para agregar al brigadista  */}
                <form onSubmit={handleAdd}>
                    <Container sx={{
                        display: "flex",            // también será flex
                        flexDirection: "column",    // los inputs se ordenarán verticalmente
                        alignItems: "center",       // alineados al centro
                        my: "2rem"                  // se tiene un margen tanto top como bottom de 2rem
                    }}>
                        {/* Toda esta parte corresponde a los inputs, que en MUI son TextFields */}
                        {/* Se tienen los mismo estilos para estos componentes */}
                        {/* PLACA */}
                        <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> PLACA</Typography>
                        <TextField id="placa" placeholder="Placa" variant='standard' value={placa} onChange={handlePlacaChange}
                            sx={{ bgcolor: "white", width: "50%", my: "1rem", p: 1 }}
                        /> {/* Se tiene un backgroundColor blanco para el input, con un largo del 30%, un margen vertical de 1rem  y un padding de 8px general*/}

                        {/* MODELO */}
                        <Typography variant="h5" fontWeight={"ligjht"} textAlign={'center'}> MARCA</Typography>
                        <TextField id="mod" placeholder="Modelo" variant='standard' value={marca} onChange={handleMarcaChange}
                            sx={{ bgcolor: "white", width: "50%", my: "1rem", p: 1 }}
                        />
                        {/* AÑO */}
                        <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> AÑO</Typography>
                        <TextField id="year" placeholder="Año" variant='standard' type='number' value={year} onChange={handleYearChange}
                            sx={{ bgcolor: "white", width: "50%", my: "1rem", p: 1 }}
                        />

                        {/* COLOR */}
                        <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> COLOR DEL VEHÍCULO</Typography>
                        <Select
                            id="color"
                            value={color}
                            onChange={handleColorChange}
                            variant='standard'
                            sx={{ bgcolor: "white", width: "50%", my: "1rem", p: 1 }}
                        >
                            <MenuItem value="rojo">Rojo</MenuItem>
                            <MenuItem value="azul">Azul</MenuItem>
                            <MenuItem value="negro">Negro</MenuItem>
                            <MenuItem value="blanco">Blanco</MenuItem>
                        </Select>

                        {/* DUEÑO */}
                        <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> SELECCIONE EL DUEÑO</Typography>
                        <TextField id="owner" placeholder="Dueño" variant='standard' type='text' value={dueno} onChange={handleDuenoChange}
                            sx={{ bgcolor: "white", width: "50%", my: "1rem", p: 1 }}
                        />
                    </Container>
                    <Container sx={{ alignContent: "center" }}>

                        <Button bgcolor='primary.main' variant='contained' type='submit'>CREAR AUTOMÓVIL</Button>
                    </Container>


                </form>

                {/* Se tiene el componente botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}

                {/* etiqueta vacía para aumentar el tamaño de la página y se vea del color navy blue  */}
                <u style={{ marginBottom: "10rem" }} />
            </Container >
        </>
    )
}
