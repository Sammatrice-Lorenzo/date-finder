import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import styles from '@/styles/notfound.module.css'
import { getTranslations } from 'next-intl/server'

export default async function NotFound(): Promise<React.ReactElement> {
  const t = await getTranslations('PWA')

  return (
    <Box className={styles.boxNotFound}>
      {/* https://undraw.co/ */}
      <Image src='/images/not-found.svg' alt='Page not found' width={400} height={400} />

      <Typography variant='h5' gutterBottom>
        {t('PAGE_NOT_FOUND')}
      </Typography>

      <Typography variant='body1' sx={{ mb: 4 }}>
        {t('MISSED_DATE')} <CalendarMonthIcon />
      </Typography>

      <Button variant='contained' color='primary' component={Link} href='/'>
        Home
      </Button>
    </Box>
  )
}
