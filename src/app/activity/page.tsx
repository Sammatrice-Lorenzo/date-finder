'use client'

import InvitationActivity from '@/components/Activity/InvitationActivity'
import Header from '@/components/Header'
import SpinnerLoader from '@/components/Loader/SpinnerLoader'
import useApi from '@/hooks/useApi'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import { Box } from '@mui/material'
import { notFound, useSearchParams } from 'next/navigation'
import type React from 'react'
import type { UrlActivityDecoded } from '../api/decode-url/route'
import { Suspense } from 'react'

const Search = (): React.ReactElement => {
  const searchParams = useSearchParams()
  const token: string | null = searchParams.get('token')

  const { data, isLoading } = useApi({
    method: 'POST',
    url: '/api/decode-url',
    body: JSON.stringify({ token: token }),
  })

  const dataResponse = data as UrlActivityDecoded | null
  const activity = dataResponse?.response as ActivityQueryProps | null

  if (activity === null) {
    return notFound()
  }

  return isLoading ? (
    <SpinnerLoader
      sx={{
        marginTop: '10%',
        alignContent: 'center',
      }}
    />
  ) : (
    <InvitationActivity key={0} activity={activity} />
  )
}

export default function Activity(): React.ReactElement {
  return (
    <Suspense fallback={<SpinnerLoader />}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        <Header />
        <Search />
      </Box>
    </Suspense>
  )
}
