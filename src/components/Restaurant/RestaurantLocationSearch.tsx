import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import PlaceIcon from '@mui/icons-material/Place';
import React from 'react';

export default function RestaurantLocationSearch(): React.ReactElement
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
        <PlaceIcon />
      </IconButton>
      <InputBase
        id='input-location'
        sx={{
          ml: 1,
          flex: 1,
        }}
        placeholder='Ville'
        inputProps={{ 'aria-label': 'Recherche' }}
        onChange={handleSearchIconUpdateColor}
      />
    </>
  )
}
