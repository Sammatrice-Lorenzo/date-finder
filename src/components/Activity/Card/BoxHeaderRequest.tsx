import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import PersonIcon from '@mui/icons-material/Person'

export type BoxHeaderRequestProps = {
  targetName: string
}
const BoxHeaderRequest = ({ targetName }: BoxHeaderRequestProps): React.ReactElement => {
  const greetings: string = (new Date()).getHours() < 20 ? 'Bonjour' : 'Bonsoir'  

  return (
    <Box display="flex" mb={3}>
      <Avatar sx={{ bgcolor: '#ff6f61', width: 30, height: 30 }}>
        <PersonIcon fontSize="medium" />
      </Avatar>
      <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold' }}>
        {greetings} {targetName}
      </Typography>
    </Box>
  )
}

export default BoxHeaderRequest