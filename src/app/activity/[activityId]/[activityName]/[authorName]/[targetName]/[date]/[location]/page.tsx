'use client'

import InvitationActivity from '@/components/Activity/InvitationActivity'
import Header from '@/components/Header'
import { RequestActivityFormService } from '@/services/RequestActivityFormService'
import { ActivityQueryProps } from '@/types/ActivityQueryProps'
import { Box } from '@mui/material'
import React from 'react'

export default function Activity({ params }: Readonly<{params: ActivityQueryProps}>): React.ReactElement {

  const routerParameters: ActivityQueryProps = RequestActivityFormService.decodeParametersRouteRequestActivity(params)

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
  
      <InvitationActivity
        key={0}
        activityName={routerParameters.activityName} 
        authorName={routerParameters.authorName}
        targetName={routerParameters.targetName}
        date={routerParameters.date}
        location={routerParameters.location}
      />
    </Box>
  )
}
