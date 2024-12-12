'use server'

import InvitationActivity from '@/components/Activity/InvitationActivity'
import Header from '@/components/Header'
import { UrlActivityGeneratorService } from '@/services/UrlActivityGeneratorService'
import { ActivityQueryProps } from '@/types/ActivityQueryProps'
import { Box } from '@mui/material'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function Activity({ params }: Readonly<{params: {request: string}}>): Promise<React.ReactElement>
{
  const routerParameters: ActivityQueryProps | null = UrlActivityGeneratorService.decodeParametersRouteRequestActivity(params.request)
  
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
        marginTop: 2
      }}
    >
      <Header />
      <InvitationActivity
        key={0}
        activity={routerParameters}
      />
    </Box>
  )
}
