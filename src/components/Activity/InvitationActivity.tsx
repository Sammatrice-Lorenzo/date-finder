import { Box, Typography, Divider, Paper } from '@mui/material'
import CardRequestActivity from './Card/CardRequestActivity'
import BoxFooterCardRequest from './Card/BoxFooterCardRequest'
import BoxHeaderRequest from './Card/BoxHeaderRequest'
import { ActivityQueryProps } from '@/types/ActivityQueryProps'
import fr from '../../locales/fr/common.json'

export type InvitationActivityProps = {
  activity: ActivityQueryProps
}

export default function InvitationActivity({ activity }: Readonly<InvitationActivityProps>) {

  return (
    <Box alignItems="center" justifyContent="center" minHeight="80vh" sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ maxWidth: 500, width: '100%', p: 3, borderRadius: 2 }}>
        <BoxHeaderRequest targetName={activity.target} />
        <Divider />

        <Typography variant="h5" sx={{ ml: 2, marginTop: '3%' }}>
          {activity.author} {fr.ACTIVITY.INVITATION.TITLE}
        </Typography>

        <CardRequestActivity
          key={0}
          activity={activity}
        />
        <Divider />

        <BoxFooterCardRequest activityQuery={activity} />
      </Paper>
    </Box>
  )
}
