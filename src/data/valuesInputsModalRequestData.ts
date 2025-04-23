import { RequestActivityNameEnum } from '@/enums/RequestActivityNameEnum'
import type { InputModalRequestActivity } from '@/interfaces/InputModalRequestActivity'
import fr from '../locales/fr/common.json'

const valuesInputsModalRequestActivity = (): InputModalRequestActivity[] => {
  return [
    {
      id: 'date-input',
      name: RequestActivityNameEnum.DATE,
      label: fr.ACTIVITY.FORM.DATE,
      type: 'datetime-local',
      margin: 'none',
      props: {
        inputLabel: {
          shrink: true,
        },
      },
    },
    {
      id: 'author-input',
      name: RequestActivityNameEnum.AUTHOR_NAME,
      label: fr.ACTIVITY.FORM.YOUR_NAME,
      margin: 'dense',
      type: 'text',
    },
    {
      id: 'author-email',
      name: RequestActivityNameEnum.AUTHOR_EMAIL,
      label: fr.ACTIVITY.FORM.YOUR_EMAIL,
      margin: 'dense',
      type: 'email',
    },
    {
      id: 'target-input',
      margin: 'dense',
      name: RequestActivityNameEnum.TARGET_NAME,
      label: fr.ACTIVITY.FORM.NAME_TARGET,
      type: 'text',
    },
  ]
}

export default valuesInputsModalRequestActivity
