'use client'

import { RestaurantCategoriesEnum } from '@/app/enums/RestaurantCategoriesEnum'
import { Chip, Grid2 } from '@mui/material'
import React, { useState } from 'react'

export type RestaurantCategoriesProps = {
  setCategorySearch: (search: string) => void
}

export function RestaurantCategories({ setCategorySearch }: RestaurantCategoriesProps): React.ReactElement
{
  const restaurantsCategories: string[] = Object.values(RestaurantCategoriesEnum)
  const restaurantsCategoriesKeys: string[] = Object.keys(RestaurantCategoriesEnum)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleCategorySearch = (): void => {
    setHoveredIndex(null)
    setCategorySearch('')
  }

  return (
    <Grid2 
      container 
      columns={3} 
      columnSpacing={2} 
      sx={{ 
        marginTop: 3, 
        marginBottom: 2, 
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      {restaurantsCategories.map((category: string, key: number): React.ReactElement => (
        <Grid2 key={restaurantsCategoriesKeys[key]}>
          <Chip
            label={category}
            component='a'
            variant='outlined'
            clickable
            style={{
              color: 'white',
              margin: '2%', 
              backgroundColor: hoveredIndex === key ? '#d33252' : 'black',
            }}
            onMouseEnter={() => setHoveredIndex(key)}
            onMouseLeave={handleCategorySearch}
            onClick={() => setCategorySearch(category)}
          />
        </Grid2>
      ))}
    </Grid2>
  )
}