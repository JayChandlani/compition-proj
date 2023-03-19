import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CallIcon from '@mui/icons-material/Call';
const Waiting = ({ user }) => {
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => { setTimeLeft(time => time - 1) }, 1000)

        if (timeLeft === 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);// eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     if (timeLeft === 0) {
    //         clearInterval(timer);
    //     }
    //     // reset the interval after the timer is done.
    // }, [timeLeft]);

    return (
        <Box sx={{
            textAlign: 'center'
        }}>
            <Typography sx={{
                fontSize: 30,
                color: 'secondary.main'
            }}>{timeLeft >= 0 ? "You are being assigned a representative." : "Greetings " + user.name}</Typography>
            <Typography sx={{ my: 2, fontSize: 20, color: 'primary.main' }}>{timeLeft >= 0 ? "Waiting Time:" : "You are on call with Sanjana Sagar"}</Typography>
            <Button

                variant='outlined'
                sx={{
                    border: 5,
                    borderRadius: "100%",
                    width: 300,
                    height: 300,
                    fontSize: 100,
                    "&:hover": {
                        border: 5,

                    }
                }}>{timeLeft >= 0 ? timeLeft : <CallIcon sx={{ fontSize: 50 }} />}</Button>
        </Box>
    )
}

export default Waiting