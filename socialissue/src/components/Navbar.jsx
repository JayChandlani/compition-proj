import React from 'react'
import { Box, Typography } from '@mui/material'
const Navbar = () => {
    return (
        <Box sx={{
            backgroundColor: 'black',

        }}>
            <Typography sx={{
                color: '#fff',
                fontWeight: 400,
                fontSize: { md: 40, xs: 20 },
                p: "2% 5%"
            }}>Kranti🔥 <Typography>Get Help in Reporting Cyber Fraud</Typography></Typography>

        </Box>
    )
}

export default Navbar