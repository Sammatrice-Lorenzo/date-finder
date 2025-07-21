import { Box, Button, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'

export type InstallDefaultPWAProps = {
  handleInstallClick: () => void
}

const InstallDefaultPWA = ({ handleInstallClick }: InstallDefaultPWAProps): React.ReactElement => {
  const t = useTranslations('PWA')

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
          {t('INSTALL')}
        </Typography>
      </Box>
      <Box>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          onClick={handleInstallClick}
          aria-label='Install PWA'
        >
          {t('HOME')}
        </Button>
      </Box>
    </>
  )
}

export default InstallDefaultPWA
