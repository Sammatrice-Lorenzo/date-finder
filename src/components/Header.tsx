import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function Header(): React.ReactElement
{
  return (
    <>
      <Image
        aria-hidden
        src='/images/Date-finder.png'
        alt='Date finder'
        width={100}
        height={100}
      />
      <Typography variant='h3' component='h1' gutterBottom>
        DateFinder
      </Typography><Typography variant='h5' component='h2' gutterBottom>
        Planifier votre prochain date
      </Typography>
    </>
  )
}
