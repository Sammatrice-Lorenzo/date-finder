import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import ShareIcon from '@mui/icons-material/Share'
import AddIcon from '@mui/icons-material/Add'

const InstallIOS = (): React.ReactElement => {
  const t = useTranslations('PWA')

  return (
    <Typography>
      {t('IOS')} <ShareIcon fontSize='small' sx={{ verticalAlign: 'middle' }} /> {t('BUTTON_SHARE')}{' '}
      <AddIcon fontSize='small' sx={{ verticalAlign: 'middle' }} /> {t('AFTER_CLICKED')}
    </Typography>
  )
}

export default InstallIOS
