import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { Box, Typography, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export type HeaderPlacePros = {
  typePlace: string
}

const HeaderPlace = ({ typePlace }: HeaderPlacePros) => {
  const router: AppRouterInstance = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <IconButton 
        onClick={() => router.push('/')} 
        aria-label='Retour'
        sx={{
          '&:hover': { color: 'primary.main' },
        }}
      >
        <KeyboardReturnIcon />
      </IconButton>

      <Typography 
        variant='h6' 
        component='div' 
        sx={{
          textAlign: 'center',
          flexGrow: 1,
          fontWeight: 600,
        }}
      >
        {typePlace} à proximité
      </Typography>

      <Box sx={{ width: '48px' }} />
    </Box>
  )
}

export default HeaderPlace
