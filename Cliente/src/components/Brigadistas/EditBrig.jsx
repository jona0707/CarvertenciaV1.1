// Componente para añadir un Brigadista

import { Container, Typography, TextField } from '@mui/material'
import photo from '../../resources/photo.png'
import { CustomBtn } from '../Comunes/CustomBtn'
import { Banner } from '../Comunes/Banner'

export const EditBrig = () => {
    return (
        <>
        <Banner ruta={"/welcome"}/>
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
                <Typography variant="h3" fontWeight={"bold"} textAlign={'center'} marginTop={5}> EDITA EL BRIGADISTA </Typography>
                {/* Definimos un h4 en letra de ancho normal, alineado al centro que muestra la comunidad  */}
                <Typography variant="h4" textAlign={'center'}><u>nombreBrigadista</u></Typography>

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

                    {/* CEDULA */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> CÉDULA</Typography>
                    <TextField id="ced" placeholder="Cédula" variant='standard' disabled="off"
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    /> {/* Además se tiene un placeholder oportuno para cada input, y la variante de input es estandar, tiene un fondo, la otra opción era outlined*/}

                    {/* DIRECCION */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> DIRECCIÓN</Typography>
                    <TextField id="dir" placeholder="Dirección" variant='standard'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    /> {/* Para la Typography se utiliza un título 5, con letra fina y alineado al centro */}

                    {/* SECTOR-BARRIO */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> SECTOR O BARRIO</Typography>
                    <TextField id="sec" placeholder="Sector/Barrio" variant='standard'
                        sx={{ bgcolor: "white", width: "30%", my: "1rem", p: 1 }}
                    />

                    {/* FOTOGRAFÍA */}
                    <Typography variant="h5" fontWeight={"light"} textAlign={'center'}> FOTOGRAFÍA</Typography>
                    <img src={photo} style={{ width: "10%" }} alt='fotografía de brigadista'/> {/* La imagen es una foto predeterminada en png */}
                </Container>

                {/* Se tiene el componente botón, el cual es customizable dado que se usa en varias interfaces y tiene el mismo estilo */}
                <CustomBtn texto={"AÑADIR BRIGADISTA"} style={{ marginBottom: "10rem" }} ruta={"/brigadistas"}/>

                {/* etiqueta vacía para aumentar el tamaño de la página y se vea del color navy blue  */}
                <u style={{ marginBottom: "10rem" }} />
            </Container>
        </>
    )
}
