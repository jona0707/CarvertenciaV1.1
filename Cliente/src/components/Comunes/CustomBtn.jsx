// Componente CustomBtn que se muestra en varias interfaces

import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";


export const CustomBtn = ({ texto, ruta }) => {     // enviamos texto como prop, para usar varias veces el botón según corresponda
                                                    // ahora recibimos también una función para navegar

    const nav = useNavigate();
    const handleRoute = () => nav(ruta)


    return (
        // El botón es importado de MUI, del color vino definido en el theme y es contained para que tenga fondo
        // el texto es el prop desestructurado
        <Button bgcolor='primary.main' variant='contained' onClick={handleRoute}>{texto} </Button>
    )
}
