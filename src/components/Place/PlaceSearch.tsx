import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined'
import React, { ChangeEvent, useState } from 'react'

export type PlaceNameSearchProps = {
  placeholder: string,
  idInput: string,
  setSearch: (input: string) => void
}

const PlaceSearch = ({ idInput, placeholder, setSearch, }: PlaceNameSearchProps ): React.ReactElement => {
  const [colorIcon, setColorIcon] = React.useState<'default' | 'primary' | 'secondary'>('default')
  const handleSearchIconUpdateColor = (element: React.ChangeEvent<HTMLInputElement>): void => {
    const isNotEmptyValue: boolean = element.target.value.trim() !== ''
    setColorIcon(isNotEmptyValue ? 'primary' : 'default')
  }

  const [inputValue, setInputValue] = useState<string>('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
    handleSearchIconUpdateColor(event)
  }

  const clearInput = (): void => {
    setInputValue('')
    setSearch('')
    setColorIcon('default')
  }

  return (
    <>
      <IconButton
        type='button'
        aria-label='search'
        sx={{ color: colorIcon === 'primary' ? '#d33252' : 'inherit' }}
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        id={idInput}
        value={inputValue}
        sx={{
          ml: 1,
          flex: 1,
        }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'Recherche' }}
        onChange={handleChange}
      />
      <IconButton
        onClick={clearInput}
        type='button'
        aria-label='search'
        sx={{ color: colorIcon === 'primary' ? '#d33252' : 'inherit' }}
      >
        <BackspaceOutlinedIcon />
      </IconButton>
    </>
  )
}

export default PlaceSearch