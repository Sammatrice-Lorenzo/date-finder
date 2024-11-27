'use client'

import { ActivityQueryProps } from "@/types/ActivityQueryProps";
import { Box, Button } from "@mui/material";
import React from "react";
import ModalEmailTarget from "../ModalEmailTarget";
import { AlertEnum } from "@/enums/AlertEnum";
import { useAlert } from "@/hooks/useAlert";

interface BoxFooterCardRequestProps {
  activity: ActivityQueryProps
}

const BoxFooterCardRequest = ({ activity }: BoxFooterCardRequestProps): React.ReactElement => {
  const [openModal, setOpen] = React.useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { showAlert } = useAlert()

  const handleSendInviteRefused = async () => {
    const response = await fetch('/api/invite-refused', {
      method: 'POST',
      body: JSON.stringify({
        activity: activity,
      })
    })

    const data = await response.json()
    const alert: AlertEnum = response.ok ? AlertEnum.Success : AlertEnum.Error
    showAlert(data.message, alert)
  }

  return (
    <Box display="flex" justifyContent="space-around" mt={3}>
      <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
        Accepter
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => handleSendInviteRefused()}>
        Décliner
      </Button>
      <ModalEmailTarget
        activity={activity}
        isOpen={openModal}
        onClose={handleClose}
      />
    </Box>
  )
}

export default BoxFooterCardRequest