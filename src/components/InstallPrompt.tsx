import { Button, Typography, Box, IconButton, Avatar } from '@mui/material'
import type React from 'react'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ShareIcon from '@mui/icons-material/Share'
import AddIcon from '@mui/icons-material/Add'
import fr from '../locales/fr/common.json'
import type { BeforeInstallPromptEventInterface } from '@/interfaces/BeforeInstallPromptEventInterface'

export default function InstallPrompt(): React.ReactElement | null {
  const [isIOS, setIsIOS] = useState<boolean>(false)
  const [isStandalone, setIsStandalone] = useState<boolean>(false)
  const [showBanner, setShowBanner] = useState<boolean>(true)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEventInterface | null>(null)
  const [showInstructionIOS, setShowInstructionIOS] = useState<boolean>(false)

  useEffect(() => {
    const isIOS = (): boolean => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)
    }
    setIsIOS(isIOS())

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    window.addEventListener('beforeinstallprompt', e => {
      const promptEvent = e as BeforeInstallPromptEventInterface
      e.preventDefault()
      setDeferredPrompt(promptEvent)
    })
  }, [])

  const renderInstallIOS = (): React.ReactElement => {
    return (
      <Typography>
        {fr.PWA.IOS} <ShareIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> {fr.PWA.BUTTON_SHARE}{' '}
        <AddIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> {fr.PWA.AFTER_CLICKED}
      </Typography>
    )
  }

  const handleInstallClick = () => {
    if (isIOS) {
      setShowInstructionIOS(true)
    }

    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null)
      })
    }
  }

  if (isStandalone || !showBanner) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'top',
        bottom: 16,
        left: 16,
        right: 16,
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton size="small" onClick={() => setShowBanner(false)} sx={{ color: '#888', mr: 1 }}>
          <CloseIcon />
        </IconButton>
        <Avatar src="images/Date-finder.png" alt="DateFinder" sx={{ width: 48, height: 48 }} />
      </Box>

      {showInstructionIOS ? (
        renderInstallIOS()
      ) : (
        <>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {fr.PWA.INSTALL}
            </Typography>
          </Box>
          <Box>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={handleInstallClick}
              aria-label="Install PWA"
            >
              {fr.PWA.HOME}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}
