'use client'

import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import translate from '@/locales/fr/common.json'
import styles from '@/styles/notfound.module.css'

export default function NotFound(): React.ReactElement {
  return (
    <Box className={styles.boxNotFound}>
      {/* https://undraw.co/ */}
      <Image src='/images/not-found.svg' alt='Page not found' width={400} height={400} />

      <Typography variant='h5' gutterBottom>
        {translate.PWA.PAGE_NOT_FOUND}
      </Typography>

      <Typography variant='body1' sx={{ mb: 4 }}>
        {translate.PWA.MISSED_DATE} <CalendarMonthIcon />
      </Typography>

      <Button variant='contained' color='primary' component={Link} href='/'>
        Home
      </Button>
    </Box>
  )
}
