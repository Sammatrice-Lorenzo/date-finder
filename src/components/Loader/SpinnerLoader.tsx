import { Box, CircularProgress } from '@mui/material'

const SpinnerLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: '45%',
        marginBottom: '5%'
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  )
}

export default SpinnerLoader