'use client'

import SkeletonComponent from '@/components/Loader/SkeletonComponent'
import { Grid2 } from '@mui/material'

export default function CardSkeleton(): React.ReactElement
{
  return (
    <Grid2 size={{ xs: 12, md: 4 }}>
      <SkeletonComponent />
      <SkeletonComponent />
      <SkeletonComponent />
    </Grid2>
  )
}