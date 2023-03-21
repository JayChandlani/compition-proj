import { Box } from '@mui/material'
import React, { useState } from 'react'
import ComplaintForm from './components/ComplaintForm'
import Navbar from './components/Navbar'
import Waiting from './components/Waiting'

const App = () => {
  const [countdown, setCountdown] = useState(false);
  const [user, setUser] = useState("");

  const handleCountDown = (data, res) => {
    setCountdown(res);
    setUser(data);
  }
  console.log(user);
  return (
    <>
      <Navbar />
      <Box sx={{
        p: "5% 20%"
      }}>
        {countdown ? <Waiting user={user} /> : <ComplaintForm handleCountDown={handleCountDown} />
        }
      </Box>
    </>
  )
}

export default App