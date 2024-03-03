// Componente para añadir un Carro

import { Container, Typography, TextField, Select, MenuItem } from '@mui/material'
import React from 'react';
import { CustomBtn } from '../Comunes/CustomBtn'
import { Banner } from '../Comunes/Banner'

export const AddCar = () => {

    const [color, setColor] = React.useState('');
    const [dueno, setDueno] = React.useState('');

    const handleColorChange = (event) => {
        setColor(event.target.value);
    }
    const handleDueñoChange = (event) => {
        setDueno(event.target.value);
    }
    return (
        <>
            <Banner ruta={"/autos"}/>
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
                <Typography variant="h4" textAlign={'center'}> COMUNIDAD B</Typography>

                {/* En este Container se tendrán los inputs para agregar al brigadista  */}
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
                    <TextField id="placa" placeholder="Placa" variant='standard'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    /> {/* Se tiene un backgroundColor blanco para el input, con un largo del 30%, un margen vertical de 1rem  y un padding de 8px general*/}

                    {/* MODELO */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> MODELO</Typography>
                    <TextField id="mod" placeholder="Modelo" variant='standard'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    />
                    {/* AÑO */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> AÑO</Typography>
                    <TextField id="year" placeholder="Año" variant='standard' type='number'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    />

                    {/* COLOR */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> COLOR DEL VEHÍCULO</Typography>
                    <Select
                        id="color"
                        value={color}
                        onChange={handleColorChange}
                        variant='standard'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    >
                        <MenuItem value="">
                            <em>Seleccione un Color</em>
                        </MenuItem>
                        <MenuItem value="rojo">Rojo</MenuItem>
                        <MenuItem value="azul">Azul</MenuItem>
                        <MenuItem value="negro">Negro</MenuItem>
                        <MenuItem value="blanco">Blanco</MenuItem>
                    </Select>

                    {/* DUEÑO */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> SELECCIONE EL DUEÑO</Typography>
                    <Select
                        id="due"
                        value={dueno}
                        onChange={handleDueñoChange}
                        variant='standard'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    >
                        <MenuItem value="">
                            <em>Seleccione un Dueño</em>
                        </MenuItem>
                        <MenuItem value="a">Nombre - Apellido</MenuItem>
                        <MenuItem value="b">NombreB - ApellidoB</MenuItem>
                    </Select>
                </Container>

                {/* Se tiene el componente botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}
                <CustomBtn texto={"AÑADIR AUTOMÓVIL"} style={{ marginBottom: "10rem" }} ruta={"/autos/qr"} />

                {/* etiqueta vacía para aumentar el tamaño de la página y se vea del color navy blue  */}
                <u style={{ marginBottom: "10rem" }} />
            </Container>
        </>
    )
}
