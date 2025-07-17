import MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import { ProviderInterface } from '@/interfaces/provider/ProviderInteface'
import useMovieStore from '@/services/store/useMovieStore'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { mutate } from 'swr'

const SelectMovieProviders = (): React.ReactElement => {
  const movieStore: MovieStoreInterface = useMovieStore()
  const t = useTranslations('MOVIE')

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = Number(event.target.value)
    const newProvider = movieStore.selectedProvider === selectedId ? 0 : selectedId

    movieStore.resetFilters()
    movieStore.setSelectedProvider(newProvider)

    mutate(`/api/movies?${movieStore.queryParams().toString()}`)
  }

  return (
    <Select
      labelId='select-provider-label'
      id='select-provider'
      value={movieStore.selectedProvider.toString()}
      label={t('PROVIDERS')}
      onChange={e => handleChange(e)}
      sx={{ borderRadius: 5 }}
    >
      <MenuItem value={0}>
        <em>---</em>
      </MenuItem>
      {movieStore.providers.map((provider: ProviderInterface) => (
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
  )
}

export default SelectMovieProviders
