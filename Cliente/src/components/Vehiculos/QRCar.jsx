// Componente de QR
import Typography from '@mui/material/Typography'
import { Banner } from '../Comunes/Banner'
import { Container, Link, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import qr from "../../resources/photo.png"
import print from "../../resources/print.png"
import home from "../../resources/home.png"

export const QRCar = () => {
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
    
    return (
        <>
            <Banner />
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
                    <img src={qr} alt="QR code" style={{ width: '80%', border: '8px solid #6d2829', marginLeft : '2rem' }} />
                </Box>
                <Container sx={{ textAlign: "center", mt: 1 }} >
                    <img src={print} alt="Save" style={{ width: "10%", cursor: "pointer" }} onClick={downloadQRCode} />
                    <br />
                    <img src={home} alt="Administración de autos" style={{ width: "10%", cursor: "pointer" }} onClick={handleCar} />
                    <br />
                    <img src={home} alt="Home" style={{ width: "10%", cursor: "pointer", marginTop: '1rem' }} onClick={handleHome} />
                </Container>
            </Container>
        </>
    )
}

