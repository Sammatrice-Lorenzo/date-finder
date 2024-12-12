'use client'

import { Box, Grid2 } from '@mui/material'
import type { NextPage } from 'next'
import Header from '@/components/Header'
import BoxActivity from '@/components/BoxActivity'
import InstallPrompt from '@/components/InstallPrompt'

const Home: NextPage = () => {

  return (
    <>
      <InstallPrompt />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          marginTop: 5
        }}
      >
        <Header />

        <Grid2 container spacing={3} sx={{ marginTop: 3, alignItems: 'center', justifyContent: 'center' }}>
          <Grid2 size={5}>
            <BoxActivity
              key='restaurant'
              icon='restaurant'
              title='Restaurants'
              color='#d33252'
              route='/restaurants'
            />
          </Grid2>

          <Grid2 size={5}>
            <BoxActivity
              key='movie'
              icon='movie'
              title='Films'
              color='#0aa4c5'
            />
          </Grid2>

          <Grid2 size={5}>
            <BoxActivity
              key='museum'
              icon='museum'
              title='Musées'
              color='#40916c'
            />
          </Grid2>

          <Grid2 size={5}>
            <BoxActivity
              key='map'
              icon='map'
              title='Explorer'
              color='#ff560b'
            />
          </Grid2>
        </Grid2>
    </Box>
  </>
  )
}

export default Home
