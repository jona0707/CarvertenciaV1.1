// Componente para añadir un Brigadista

import { Container, Typography, TextField } from '@mui/material'
import { CustomBtn } from '../Comunes/CustomBtn'
import { Banner } from '../Comunes/Banner'

export const EditComu = () => {
    return (
        <>
        <Banner ruta="/"/>
            {/* Definimos un Container de MUI en el que se almacenará toda la parte del formulario con inputs */}
            <Container maxWidth={false} sx={{   // con sx podemos manejar varios estilos de CSS de manera más simple 
                bgcolor: "secondary.main",      // definimos el color secundario, que es una especie de navy blue
                color: "white",                 // la letra será azul
                display: "flex",                // Hacemos un display flex para que se organice mejor los elementos hijos 
                flexDirection: "column",        // la dirección del flex es vertical
                alignItems: "center",           // alineamos los items al centro
            }}>
                {/* Titulo y subtitulo */}
                {/* Definimos un h3 en negrita, alineado al centro el título del componente */}
                <Typography variant="h3" fontWeight={"bold"} textAlign={'center'} marginTop={5}>EDITA TU COMUNIDAD</Typography>

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
                    <TextField id="name" placeholder="Nombre" variant='standard'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    /> {/* Se tiene un backgroundColor blanco para el input, con un largo del 30%, un margen vertical de 1rem  y un padding de 8px general*/}

                </Container>

                {/* Se tiene el componente botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}
                <CustomBtn texto={"EDITAR"} style={{ marginBottom: "10rem" }} ruta={"/comunidades"} />

                {/* etiqueta vacía para aumentar el tamaño de la página y se vea del color navy blue  */}
                <u style={{ marginBottom: "20rem" }} />
            </Container>
        </>
    )
}
