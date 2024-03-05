// Componente CustomBtn que se muestra en varias interfaces

import { Button } from '@mui/material'
import React from 'react'


export const CustomBtn = ({ texto }) => {     // enviamos texto como prop, para usar varias veces el botón según corresponda
    // ahora recibimos también una función para navegar

    return (
        // El botón es importado de MUI, del color vino definido en el theme y es contained para que tenga fondo
        // el texto es el prop desestructurado
        <Button type='submit' bgcolor='primary.main' variant='contained' >{texto} </Button>
    )
}
