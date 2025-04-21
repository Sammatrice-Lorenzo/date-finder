'use client'

import { Box, Grid2 } from '@mui/material'
import type { NextPage } from 'next'
import Header from '@/components/Header'
import BoxActivity from '@/components/BoxActivity'
import InstallPrompt from '@/components/InstallPrompt'
import styles from '@/styles/home.module.css'
import ACTIVITIES_DATA, { type HomeActivitiesData } from '@/data/activitiesData'
import { useCurrentLocation } from '@/hooks/useCurrentLocation'

const Home: NextPage = () => {
  useCurrentLocation()

  return (
    <>
      <InstallPrompt />
      <Box className={styles.boxHome}>
        <Header />

        <Grid2 container spacing={3} className={styles.containerGridHome}>
          {ACTIVITIES_DATA.map((activity: HomeActivitiesData) => {
            return (
              <Grid2 className={styles.gridItem} key={`${activity.key}grid`}>
                <BoxActivity
                  key={activity.key}
                  icon={activity.icon}
                  title={activity.title}
                  color={activity.color}
                  route={activity.route}
                />
              </Grid2>
            )
          })}
        </Grid2>
      </Box>
    </>
  )
}

export default Home
