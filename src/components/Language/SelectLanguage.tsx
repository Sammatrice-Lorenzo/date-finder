import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import supportedLanguages from '@/data/supportedLanguages'

export default function SelectLanguage(): React.ReactElement {
  const [language, setLanguage] = React.useState(useLocale())

  const t = useTranslations('PWA')
  const handleChageLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value)
    document.cookie = `NEXT_LOCALE=${event.target.value}; path=/; max-age=31536000`
    window.location.reload()
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 20 }} size='small'>
      <InputLabel id='select-language'>{t('LANGUAGE')}</InputLabel>
      <Select
        labelId='select-language'
        id='language-flag'
        data-testid='language-flag-test'
        value={language}
        label={t('LANGUAGE')}
        onChange={handleChageLanguage}
        sx={{ borderRadius: 5 }}
      >
        {supportedLanguages.map((language: string) => {
          const flag = language === 'en' ? 'GB' : language.toLocaleUpperCase()

          return (
            <MenuItem
              value={language}
              key={`${language}-select`}
              data-testid={`${language}-select`}
              sx={{ justifyContent: 'center' }}
            >
              <Image
                width={32}
                height={32}
                alt={language}
                src={`https://flagsapi.com/${flag}/flat/64.png`}
              />
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
