import { Box, IconButton, Avatar } from '@mui/material'
import type React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import InstallIOS from './InstallPWA/InstallIOS'
import InstallDefaultPWA from './InstallPWA/InstallDefaultPWA'
import { useInstallPrompt } from '@/hooks/installPromt/useInstallPrompt'

export default function InstallPrompt(): React.ReactElement | null {
  const { isStandalone, showBanner, setShowBanner, showInstructionIOS, handleInstallClick } =
    useInstallPrompt()

  if (isStandalone || !showBanner) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
      <Box
        sx={{
          position: 'top',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
          zIndex: 1000,
          maxWidth: 800,
          flex: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='small'
            onClick={() => setShowBanner(false)}
            sx={{ color: '#888', mr: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Avatar src='images/Date-finder.png' alt='DateFinder' sx={{ width: 48, height: 48 }} />
        </Box>

        {showInstructionIOS ? (
          <InstallIOS />
        ) : (
          <InstallDefaultPWA handleInstallClick={handleInstallClick} />
        )}
      </Box>
    </Box>
  )
}
