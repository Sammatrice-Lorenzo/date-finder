'use client'

import { RestaurantCategories } from '@/components/Restaurant/RestaurantCategories'
import { Restaurant } from '@/interfaces/Restaurant'
import { Box, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useRouter, AppRouterInstance } from 'next/navigation'
import RestaurantCard from '@/components/Restaurant/RestaurantCard'
import { useLocation } from '../context/LocationContext'
import { Location } from '@/interfaces/Location'
import RestaurantInputSearch from '@/components/Restaurant/RestaurantInputSearch'
import RestaurantSkeleton from '@/components/Restaurant/Loader/RestaurantSkeleton'

export default function Restaurants(): React.ReactElement
{
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [skeleton, setSkeleton] = useState<boolean>(true)
  const [searchLocation, setSearchLocation] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchCategory, setSearchCategory] = useState<string>('')
  const router: AppRouterInstance = useRouter()
  const userLocation: Location | null = useLocation()

  useEffect(() => {
    const fetchRestaurants = async (): Promise<void> => {
      const response: Response  = await fetch('/api/restaurant/', {
        method: 'POST',
        body: JSON.stringify({
          location: searchLocation,
          term: searchTerm,
          longitude: userLocation?.longitude,
          latitude: userLocation?.latitude,
          category: searchCategory
        })
      })
      const data = await response.json();
      console.log(data);
      console.log(data.response);
      
      setRestaurants(data.response)
      setSkeleton(false)
    }

    fetchRestaurants()
  }, [userLocation?.latitude, userLocation?.longitude, searchLocation, searchTerm, searchCategory])

  console.log(restaurants);

  return (
    <Box sx={{ padding: 4 }}>
      <KeyboardReturnIcon onClick={() => router.push('/')}/>
      <Typography variant='h4' gutterBottom>
        Restaurants à proximité
      </Typography>

      <RestaurantCategories setCategorySearch={setSearchCategory}/>
      <RestaurantInputSearch setLocationSearch={setSearchLocation} setTermSearch={setSearchTerm} />
      <Grid2 container
        spacing={4}
        // columns={2}
      >
        {skeleton ? <RestaurantSkeleton />: null}
        {restaurants?.length > 0 ? restaurants.map((restaurant: Restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        )) : null}
      </Grid2>
    </Box>
  )
}