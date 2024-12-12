'use client'

import { Grid2, Skeleton } from "@mui/material"

export default function RestaurantSkeleton(): React.ReactElement
{
  const SkeletonComponent = (): React.ReactElement => {
    return (
      <>
        <Skeleton variant="rectangular" height={118} sx={{ backgroundColor: 'white', marginTop: '3%' }} />
        <Skeleton variant="text" sx={{ backgroundColor: 'white', marginTop: '2%' }} />
        <Skeleton variant="text" width="60%" sx={{ backgroundColor: 'white', marginTop: '1%' }} />
      </>
    )
  }

  return (
    <Grid2 size={{ xs: 12, md: 4 }}>
      <SkeletonComponent />
      <SkeletonComponent />
      <SkeletonComponent />
    </Grid2>
  )
}