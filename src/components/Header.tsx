import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header(): React.ReactElement
{
  return (
    <Link href='/' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Image
        aria-hidden
        src='/images/Date-finder.png'
        alt='Date finder'
        width={100}
        height={100}
      />
      <Typography variant='h4' component='h1' gutterBottom>
        DateFinder
      </Typography>
      <Typography variant='h5' component='h2' gutterBottom>
        Planifier votre prochain date
      </Typography>
    </Link>
  )
}
