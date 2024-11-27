'use client';
import { Box, Typography, Grid2 } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MovieIcon from '@mui/icons-material/Movie';
import MuseumIcon from '@mui/icons-material/Museum';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Header from '@/components/Header';


const Home: NextPage = () => {
  const router: AppRouterInstance = useRouter()

  return (
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              bgcolor: '#d33252',
              textAlign: 'center',
              boxShadow: 2,
              "&:hover": { cursor: "pointer" }
            }}
            onClick={() => router.push('/restaurants')}
          >
            <RestaurantIcon fontSize='large'/>
            <Typography variant='h6'>Restaurants</Typography>
          </Box>
        </Grid2>

        <Grid2 size={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              bgcolor: '#0aa4c5',
              textAlign: 'center',
              boxShadow: 2,
              "&:hover": { cursor: "pointer" } 
            }}
          >
            <MovieIcon fontSize='large' />
            <Typography variant='h6'>Films</Typography>
          </Box>
        </Grid2>

        <Grid2 size={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              bgcolor: '#40916c',
              textAlign: 'center',
              boxShadow: 2,
              "&:hover": { cursor: "pointer" } 
            }}
          >
            <MuseumIcon fontSize='large' />
            <Typography variant='h6'>Musées</Typography>
          </Box>
        </Grid2>

        <Grid2 size={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              bgcolor: '#ff560b',
              textAlign: 'center',
              boxShadow: 2,
              "&:hover": { cursor: "pointer" } 
            }}
          >
            <MapIcon fontSize='large' />
            <Typography variant='h6'>Explorer</Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;
