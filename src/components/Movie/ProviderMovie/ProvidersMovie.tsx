import { ProviderType } from '@/interfaces/movie/MovieProviderResponseInterface'
import type MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import useMovieStore from '@/services/store/useMovieStore'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useTranslations } from 'next-intl'
import { mutate } from 'swr'
import React, { useState } from 'react'
import Image from 'next/image'

export type ProviderMovieProps = {
  providers: ProviderType[]
}

const ProviderMovies = ({ providers }: ProviderMovieProps) => {
  const movieStore: MovieStoreInterface = useMovieStore()
  const t = useTranslations('MOVIE')
  const [providerSelect, setProviderSelect] = useState(movieStore.provider || 0)

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = Number(event.target.value)
    setProviderSelect(selectedId)
    const newProvider = movieStore.provider === selectedId ? 0 : selectedId

    movieStore.resetFilters()
    movieStore.setProvider(newProvider)

    mutate(`/api/movies?${movieStore.queryParams().toString()}`)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel id='select-provider-label'>{t('PROVIDERS')}</InputLabel>
      <Select
        labelId='select-provider-label'
        id='select-provider'
        value={providerSelect.toString()}
        label={t('PROVIDERS')}
        onChange={e => handleChange(e)}
        sx={{ borderRadius: 5 }}
      >
        <MenuItem value={0}>
          <em>---</em>
        </MenuItem>
        {providers.map(provider => (
          <MenuItem key={provider.provider_id} value={provider.provider_id}>
            <Image
              src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
              alt={provider.provider_name}
              width={32}
              height={32}
              style={{ marginRight: 8 }}
            />
            {provider.provider_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ProviderMovies
