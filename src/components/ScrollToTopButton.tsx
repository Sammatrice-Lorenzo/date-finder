import { useEffect, useState } from 'react'
import { Fade, IconButton } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import styles from '@/styles/header.module.css'

const ScrollToTopButton = (): React.ReactElement => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const toggleVisibility = (): void => {
      setVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Fade in={visible}>
      <IconButton className={styles.scrollTopButton} onClick={scrollToTop} aria-label='Scroll Up'>
        <KeyboardArrowUpIcon />
      </IconButton>
    </Fade>
  )
}

export default ScrollToTopButton
