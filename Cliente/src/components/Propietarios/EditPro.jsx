// Componente para añadir un Propietario

import { Container, Typography, TextField } from '@mui/material'
import React from 'react';
import { CustomBtn } from '../Comunes/CustomBtn'
import { Banner } from '../Comunes/Banner'
import photo from '../../resources/photo.png'

export const EditPro = () => {

    return (
        <>
            <Banner ruta={"/autos"} />
            <Container maxWidth={false} sx={{   // con sx podemos manejar varios estilos de CSS de manera más simple 
                bgcolor: "secondary.main",      // definimos el color secundario, que es una especie de navy blue
                color: "white",                 // la letra será azul
                display: "flex",                // Hacemos un display flex para que se organice mejor los elementos hijos 
                flexDirection: "column",        // la dirección del flex es vertical
                alignItems: "center",           // alineamos los items al centro
            }}>
                {/* Titulo y subtitulo */}
                {/* Definimos un h3 en negrita, alineado al centro el título del componente */}
                <Typography variant="h3" fontWeight={"bold"} textAlign={'center'} marginTop={5}> AÑADE UN PROPIETARIO</Typography>
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
                    {/* NOMBRE */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> NOMBRE</Typography>
                    <TextField id="nombre" placeholder="Nombre" variant='standard' disabled='off'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    /> {/* Se tiene un backgroundColor blanco para el input, con un largo del 30%, un margen vertical de 1rem  y un padding de 8px general*/}

                    {/* Cedula */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> CEDULA</Typography>
                    <TextField id="ced" placeholder="Cedula" variant='standard' type='number' disabled='off'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    />

                    {/* Direccion */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> DIRECCIÓN</Typography>
                    <TextField id="dir" placeholder="Direccion" variant='standard' 
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    />

                    {/* FOTOGRAFÍA */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> FOTOGRAFÍA</Typography>
                    <img src={photo} style={{ width: "10%" }} /> {/* La imagen es una foto predeterminada en png */}

                </Container>

                {/* Se tiene el componente botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}
                <CustomBtn texto={"EDITAR"} style={{ marginBottom: "10rem" }} ruta={"/propietarios"} />

                {/* etiqueta vacía para aumentar el tamaño de la página y se vea del color navy blue  */}
                <u style={{ marginBottom: "10rem" }} />
            </Container>
        </>
    )
}
