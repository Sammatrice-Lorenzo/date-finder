import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { RequestActivityFormService } from '@/services/RequestActivityFormService'
import { ShareDataInterface } from '@/interfaces/ShareDataInterface'
import { MailService } from '@/services/MailService'
import ActivityInterface from '@/interfaces/ActivityInterface'
import { InputRequestActivity } from './InputRequestActivity'


export type ModalRequestActivityProps = {
  activity: ActivityInterface
  open: boolean
  onClose: () => void
}

const handleShare = async (activity : ActivityInterface, formData: FormData): Promise<void> => {
  const baseUrl: string = window.location.origin
  const shareData: ShareDataInterface = RequestActivityFormService.generateParametersActivityForShare(activity, formData, baseUrl)
  // alert(shareData.url)

  // if (navigator.share) {
  //   try {
  //     await navigator.share(shareData)
  //   } catch (err) {
  //     console.error('Erreur de partage:', err)
  //   }
  // } else {
  //   MailService.sendMail(shareData)
  //   console.log('L\'API de partage n\'est pas supportée sur ce navigateur')
  // }
}

export default function ModalRequestActivity({ activity, open, onClose }: Readonly<ModalRequestActivityProps>): React.ReactElement {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          const formData: FormData = new FormData(event.currentTarget)
          if (RequestActivityFormService.areFormFieldsValid(formData)) {
            handleShare(activity, formData)
            onClose()
          }
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold'}}>
        Planifier votre rendez-vous
      </DialogTitle>
      <DialogContent sx={{ pt: 2, px: 3 }}>
        <DialogContentText sx={{ textAlign: 'center', mb: 2 }}>
          Renseignez les informations pour créer une invitation que vous pourrez facilement partager.
        </DialogContentText>

        {RequestActivityFormService.getValuesInputsModalRequestActivity().map(
          (input, index) => <InputRequestActivity
            key={index}
            name={input.name}
            label={input.label}
            type={input.type}
            margin={input.margin}
            props={input.props}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          Annuler
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ ml: 2 }}
        >
          Partager
        </Button>
      </DialogActions>
    </Dialog>
  )
}
