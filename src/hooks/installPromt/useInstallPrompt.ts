import { BeforeInstallPromptEventInterface } from '@/interfaces/BeforeInstallPromptEventInterface'
import { useEffect, useState } from 'react'

export function useInstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEventInterface | null>(
    null
  )
  const [showInstructionIOS, setShowInstructionIOS] = useState(false)

  useEffect(() => {
    const isIOSDevice = (): boolean =>
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)

    setIsIOS(isIOSDevice())
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    const handleBeforeInstallPrompt = (e: Event) => {
      const promptEvent = e as BeforeInstallPromptEventInterface
      e.preventDefault()
      setDeferredPrompt(promptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

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

  return {
    isIOS,
    isStandalone,
    showBanner,
    setShowBanner,
    showInstructionIOS,
    handleInstallClick,
  }
}
