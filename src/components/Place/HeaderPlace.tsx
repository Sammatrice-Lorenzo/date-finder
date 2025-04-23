import { Box, IconButton, Typography } from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export type HeaderPlacePros = {
  title: string
}

const HeaderPlace = ({ title }: HeaderPlacePros) => {
  const router: AppRouterInstance = useRouter()

  return (
    <Box
      sx={theme => ({
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
          paddingTop: '5%',
        },
      })}
    >
      <IconButton
        onClick={() => router.push('/')}
        aria-label="Retour"
        sx={theme => ({
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1200,
          backgroundColor: theme.palette.background.paper,
          borderRadius: '50%',
          boxShadow: 2,
          '&:hover': {
            color: 'primary.main',
          },
        })}
      >
        <KeyboardReturnIcon />
      </IconButton>

      <Typography
        variant="h6"
        component="div"
        sx={theme => ({
          textAlign: 'center',
          fontWeight: 600,
          marginBottom: '1%',
          [theme.breakpoints.down('sm')]: {
            marginBottom: '5%',
          },
        })}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default HeaderPlace
