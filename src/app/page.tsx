'use client'

import { Box, Grid2 } from '@mui/material'
import type { NextPage } from 'next'
import Header from '@/components/Header'
import BoxActivity from '@/components/BoxActivity'
import InstallPrompt from '@/components/InstallPrompt'
import styles from '@/styles/home.module.css'
import { useCurrentLocation } from '@/hooks/useCurrentLocation'
import { useTranslations } from 'next-intl'
import getActivitiesData, { HomeActivitiesData } from '@/data/activitiesData'

const Home: NextPage = () => {
  useCurrentLocation()
  const t = useTranslations('ACTIVITY.TYPES')

  return (
    <>
      <InstallPrompt />
      <Box>
        <Header />

        <Grid2 container spacing={3} className={styles.containerGridHome}>
          {getActivitiesData(t).map((activity: HomeActivitiesData) => (
            <Grid2 size={6} key={`${activity.key}grid`} className={styles.gridItem}>
              <BoxActivity
                key={activity.key}
                icon={activity.icon}
                title={activity.title}
                color={activity.color}
                route={activity.route}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  )
}

export default Home
