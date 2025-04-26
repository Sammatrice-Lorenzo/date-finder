import { Box, IconButton, Typography } from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import styles from '@/styles/header.module.css'
import ScrollToTopButton from '../ScrollToTopButton'

export type HeaderPlacePros = {
  title: string
}

const HeaderPlace = ({ title }: HeaderPlacePros) => {
  const router: AppRouterInstance = useRouter()

  return (
    <Box className={styles.containerHeader}>
      <IconButton
        onClick={() => router.push('/')}
        aria-label='Retour'
        className={styles.backButton}
      >
        <KeyboardReturnIcon />
      </IconButton>
      <ScrollToTopButton />
      <Typography variant='h6' component='div' className={styles.titleHeader}>
        {title}
      </Typography>
    </Box>
  )
}

export default HeaderPlace
