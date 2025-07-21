import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { useTranslations } from 'next-intl'
import SelectLanguage from './Language/SelectLanguage'

export default function Header(): React.ReactElement {
  const t = useTranslations('PWA')

  return (
    <Box sx={{ position: 'relative', py: 2 }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          paddingTop: 2,
        }}
      >
        <SelectLanguage />
      </Box>

      <Link
        href='/'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          aria-hidden
          src='/images/Date-finder.png'
          alt='Date finder'
          width={100}
          height={100}
        />
        <Typography variant='h4' component='h1' gutterBottom>
          DateFinder
        </Typography>
        <Typography variant='h5' component='h2' gutterBottom>
          {t('DESCRIPTION_APP')}
        </Typography>
      </Link>
    </Box>
  )
}
