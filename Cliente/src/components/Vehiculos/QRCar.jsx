// Componente de QR
import Typography from '@mui/material/Typography'
import { Banner } from '../Comunes/Banner'
import { Container, Link, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import print from "../../resources/print.png"
import home from "../../resources/home.png"
import { useEffect, useState } from 'react'
import axios from 'axios'


export const QRCar = () => {

    const { comunidad, auto } = useParams()
    const nav = useNavigate()
    const handleCar = () => nav("/autos")
    const handleHome = () => nav("/welcome")
    //funcion a modificar 
    const downloadQRCode = () => {
        const link = document.createElement('a');
        link.href = qr;
        link.download = 'QRcode.png';//ruta para descargar  el archivo
        link.click();
    }

    const [qr, setQr] = useState()
    const [userAdmin, setUserAdmin] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userAdmin = localStorage.getItem('userAdmin');
        const id = localStorage.getItem('carID');
        setUserAdmin(userAdmin);

        axios.get(`http://localhost:8000/api/carvertencia/auto/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => {
                const code = response.data.qrAutomovil;
                const decode = atob(code)
                setQr(decode)
                // Aquí puedes manejar la respuesta de la solicitud
            })
            .catch((err) => {
                console.error("Error al obtener el automóvil:", err);
            });
    }, []);


    return (
        <>
            <Banner ruta={"/"+comunidad + "/autos"} nombreAdmin={userAdmin} />
            {/* Definimos un Container que albergue todo el componente */}
            <Container maxWidth={false} sx={{
                bgcolor: "secondary.main",
                color: "white",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                m: 0
            }}>
                <Typography variant="h3" fontWeight={"bold"}> QR DE SU AUTOMÓVIL</Typography>
                <Box style={{ marginTop: '0.5rem' }}>
                    <img src={`data:image/png;base64,${qr}`} alt="QR code" style={{ width: '100%', border: '8px solid #6d2829', marginLeft: '2rem' }} />
                </Box>
                <Container sx={{ textAlign: "center", mt: 1 }} >
                    <img src={print} alt="Save" style={{ width: "10%", cursor: "pointer" }} onClick={downloadQRCode} />
                    <br/>
                    <img src={home} alt="Home" style={{ width: "10%", cursor: "pointer", marginTop: '1rem' }} onClick={handleHome} />
                </Container>
            </Container>
        </>
    )
}

