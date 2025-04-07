import { Skeleton } from '@mui/material'

const SkeletonComponent = (): React.ReactElement => {
  return (
    <>
      <Skeleton variant='rectangular' height={118} sx={{ backgroundColor: 'white', marginTop: '3%' }} />
      <Skeleton variant='text' sx={{ backgroundColor: 'white', marginTop: '2%' }} />
      <Skeleton variant='text' width='60%' sx={{ backgroundColor: 'white', marginTop: '1%' }} />
    </>
  )
}

export default SkeletonComponent