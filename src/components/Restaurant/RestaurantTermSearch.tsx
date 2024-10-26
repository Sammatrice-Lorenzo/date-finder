import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

export default function RestaurantTermSearch(): React.ReactElement
{
  const [colorIcon, setColorIcon] = React.useState<'default' | 'primary' | 'secondary'>('default')
  const handleSearchIconUpdateColor = (element: React.ChangeEvent<HTMLInputElement>): void => {
    if (element.target.value.trim() !== '') {
      setColorIcon('primary')
    } else {
      setColorIcon('default')
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
        id='input-restaurant'
        sx={{
          ml: 1,
          flex: 1,
        }}
        placeholder='Restaurant'
        inputProps={{ 'aria-label': 'Recherche' }}
        onChange={handleSearchIconUpdateColor}
      />
    </>
  )
}
