'use client'

import InvitationActivity from '@/components/Activity/InvitationActivity'
import Header from '@/components/Header'
import { RequestActivityFormService } from '@/services/RequestActivityFormService'
import { ActivityQueryProps } from '@/types/ActivityQueryProps'
import { Box } from '@mui/material'
import React from 'react'

export default function Activity({ params }: Readonly<{params: ActivityQueryProps}>): React.ReactElement {

  const routerParameters: ActivityQueryProps = RequestActivityFormService.decodeParametersRouteRequestActivity(params)

  console.log(routerParameters);
  
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
