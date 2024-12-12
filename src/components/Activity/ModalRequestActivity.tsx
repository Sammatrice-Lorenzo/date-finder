import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { RequestActivityFormService } from '@/services/RequestActivityFormService'
import { ShareDataInterface } from '@/interfaces/ShareDataInterface'
import { MailService } from '@/services/MailService'
import ActivityInterface from '@/interfaces/ActivityInterface'
import { InputRequestActivity } from './InputRequestActivity'
import ModalTitle from '../ModalTitle'
import ShareIcon from '@mui/icons-material/Share'


export type ModalRequestActivityProps = {
  activity: ActivityInterface
  open: boolean
  onClose: () => void
}

async function generateUrl(activity: ActivityInterface, form: FormData): Promise<ShareDataInterface> {
  const baseUrl: string = window.location.origin

  const formObject: Record<string, string> = {};
  form.forEach((value, key) => {
    formObject[key] = value.toString()
  })

  const response: Response = await fetch('/api/generate-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ activity, baseUrl, form: formObject })
  })
  const data: { response: ShareDataInterface } = await response.json()

  return data.response
}

const handleShare = async (activity : ActivityInterface, formData: FormData): Promise<void> => {
  const shareData: ShareDataInterface = await generateUrl(activity, formData)

  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (err) {
      console.error('Erreur de partage:', err)
    }
  } else {
    MailService.sendMail(shareData)
    console.error('L\'API de partage n\'est pas supportée sur ce navigateur')
  }
}

export default function ModalRequestActivity({ activity, open, onClose }: Readonly<ModalRequestActivityProps>): React.ReactElement {
  const [error, setError] = React.useState<string | null>(null)

  const handleClose = (): void => {
    setError(null)
    onClose()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData: FormData = new FormData(event.currentTarget)
    if (RequestActivityFormService.areFormFieldsValid(formData, setError)) {
      handleShare(activity, formData)
      handleClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      <ModalTitle
        title='Planifier votre rendez-vous'
        onCloseModal={handleClose}
      />
      <DialogContent sx={{ pt: 2, px: 3 }}>
        <DialogContentText sx={{ textAlign: 'center', mb: 2 }}>
          Renseignez les informations pour créer une invitation que vous pourrez facilement partager.
        </DialogContentText>
        {error && <div id='request-activity-errors' style={{ color: 'red' }}>{error}</div>}

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

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          <ShareIcon fontSize='small' sx={{ marginRight: 1}} />
          Partager
        </Button>
      </DialogActions>
    </Dialog>
  )
}
