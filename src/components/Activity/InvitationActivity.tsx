import { Box, Typography, Divider, Paper } from '@mui/material'
import CardRequestActivity from './Card/CardRequestActivity'
import BoxFooterCardRequest from './Card/BoxFooterCardRequest'
import BoxHeaderRequest from './Card/BoxHeaderRequest'

export type InvitationActivityProps = {
  authorName: string
  targetName: string
  activityName: string
  location: string
  date: string
}

export default function InvitationActivity({
  authorName,
  targetName,
  activityName,
  location,
  date,
}: Readonly<InvitationActivityProps>) {

  return (
    <Box alignItems="center" justifyContent="center" minHeight="80vh" sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ maxWidth: 500, width: '100%', p: 3, borderRadius: 2 }}>
        <BoxHeaderRequest targetName={targetName} />
        <Divider />

        <Typography variant="h5" sx={{ ml: 2, marginTop: '3%' }}>
          {authorName} demande un date avec vous !
        </Typography>

        <CardRequestActivity
          key={0}
          authorName={authorName}
          activityName={activityName}
          date={date}
          location={location}
        />
        <Divider />

        <BoxFooterCardRequest
          activityName={activityName}
          date={date}
          location={location}
        />
      </Paper>
    </Box>
  )
}
