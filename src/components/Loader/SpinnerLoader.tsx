import { Box, CircularProgress, type SxProps, type Theme } from '@mui/material'

export type SpinnerLoaderProps = {
  sx?: SxProps<Theme>
}

const SpinnerLoader = ({ sx }: SpinnerLoaderProps) => {
  const defaultSx: SxProps<Theme> = {
    position: 'fixed',
    left: '45%',
    alignContent: 'center',
    marginBottom: '5%',
  }

  return (
    <Box sx={sx ?? defaultSx}>
      <CircularProgress color='inherit' />
    </Box>
  )
}

export default SpinnerLoader
