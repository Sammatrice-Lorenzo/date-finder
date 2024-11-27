'use client'

import { RestaurantCategories } from '@/components/Restaurant/RestaurantCategories'
import { Restaurant } from '@/interfaces/Restaurant'
import { Box, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useRouter } from 'next/navigation'
import RestaurantCard from '@/components/Restaurant/RestaurantCard'
import { Location } from '@/interfaces/Location'
import RestaurantInputSearch from '@/components/Restaurant/RestaurantInputSearch'
import RestaurantSkeleton from '@/components/Restaurant/Loader/RestaurantSkeleton'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useLocation } from '@/context/LocationContext'
import { useAlert } from '@/hooks/useAlert'
import { AlertEnum } from '@/enums/AlertEnum'

export default function Restaurants(): React.ReactElement
{
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [skeleton, setSkeleton] = useState<boolean>(true)
  const [searchLocation, setSearchLocation] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchCategory, setSearchCategory] = useState<string>('')
  const router: AppRouterInstance = useRouter()
  const userLocation: Location | null = useLocation()
  const { showAlert } = useAlert()


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
      setSkeleton(false)
      setRestaurants(data.response)
      if (!response.ok) {
        showAlert(data.message, AlertEnum.Error)
      }

      console.log(data);
      console.log(data.response);

    }

    fetchRestaurants()
  }, [userLocation?.latitude, userLocation?.longitude, searchLocation, searchTerm, searchCategory, showAlert])

  console.log(restaurants);

  return (
    <Box sx={{ padding: 4 }}>
      <KeyboardReturnIcon onClick={() => router.push('/')}/>
      <Typography variant='h4' gutterBottom>
        Restaurants à proximité
      </Typography>

      <RestaurantCategories setCategorySearch={setSearchCategory}/>
      <RestaurantInputSearch setLocationSearch={setSearchLocation} setTermSearch={setSearchTerm} />
      <Grid2
        container
        spacing={4}
      >
        {skeleton ? 
          <><RestaurantSkeleton /><RestaurantSkeleton /><RestaurantSkeleton /></>
          : null}
        {restaurants?.length > 0 ? restaurants.map((restaurant: Restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        )) : null}
      </Grid2>
    </Box>
  )
}