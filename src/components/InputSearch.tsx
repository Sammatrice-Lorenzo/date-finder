import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined'
import React, { ChangeEvent } from 'react'

export type InputSearchProps = {
  placeholder: string,
  idInput: string,
  refSearch: React.RefObject<HTMLInputElement>
  setSearch?: (input: string) => void,
  onUpdateInput?: () => void
}

const InputSearch = ({ idInput, placeholder, refSearch, onUpdateInput, setSearch }: InputSearchProps ): React.ReactElement => {
  const [colorIcon, setColorIcon] = React.useState<'default' | 'primary' | 'secondary'>('default')
  const handleSearchIconUpdateColor = (element: React.ChangeEvent<HTMLInputElement>): void => {
    const isNotEmptyValue: boolean = element.target.value.trim() !== ''
    setColorIcon(isNotEmptyValue ? 'primary' : 'default')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleSearchIconUpdateColor(event)
    if (onUpdateInput) {
      onUpdateInput()
    }
  }

  const clearInput = (): void => {
    if (setSearch) {
      setSearch('')
    }
    setColorIcon('default')
    if (refSearch.current) {
      refSearch.current.value = ''
    }

    if (onUpdateInput) {
      onUpdateInput()
    }
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
        sx={{
          ml: 1,
          flex: 1,
        }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'Recherche' }}
        onChange={handleChange}
        inputRef={refSearch}
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

export default InputSearch