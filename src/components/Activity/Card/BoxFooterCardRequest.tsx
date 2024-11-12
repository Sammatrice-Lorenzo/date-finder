'use client'

import { Box, Button } from "@mui/material";
import React from "react";

interface BoxFooterCardRequestProps {
  activityName: string
  location: string
  date: string
}

const BoxFooterCardRequest = ({ activityName, location, date}: BoxFooterCardRequestProps): React.ReactElement => {
  const handleResponse = async () => {
    await fetch('/api/event/', {
      method: 'POST',
      body: JSON.stringify({
        uid: 'uid',
        activityName: activityName,
        location: location,
        date: date,
      })
    })
  }

  return (
    <Box display="flex" justifyContent="space-around" mt={3}>
      <Button variant="contained" color="primary" onClick={() => handleResponse()}>
        Accepter
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => handleResponse()}>
        Décliner
      </Button>
    </Box>
  )
}

export default BoxFooterCardRequest