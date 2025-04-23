'use server'

import InvitationActivity from '@/components/Activity/InvitationActivity'
import Header from '@/components/Header'
import { UrlActivityGeneratorService } from '@/services/UrlActivityGeneratorService'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import { Box } from '@mui/material'
import { notFound } from 'next/navigation'
import type React from 'react'

type ActivityParams = Promise<{ request: string }>

export default async function Activity({ params }: Readonly<{ params: ActivityParams }>): Promise<React.ReactElement> {
  const request: string = (await params).request
  const routerParameters: ActivityQueryProps | null =
    new UrlActivityGeneratorService().decodeParametersRouteRequestActivity(request)

  if (routerParameters === null) {
    return notFound()
  }

  return (
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
      <InvitationActivity key={0} activity={routerParameters} />
    </Box>
  )
}
