import { RequestActivityNameEnum } from '@/enums/RequestActivityNameEnum'
import type { InputModalRequestActivity } from '@/interfaces/InputModalRequestActivity'
import { createTranslator } from 'next-intl'

const valuesInputsModalRequestActivity = (
  t: ReturnType<typeof createTranslator>
): InputModalRequestActivity[] => {
  return [
    {
      id: 'date-input',
      name: RequestActivityNameEnum.DATE,
      label: t('DATE'),
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
      label: t('YOUR_NAME'),
      margin: 'dense',
      type: 'text',
    },
    {
      id: 'author-email',
      name: RequestActivityNameEnum.AUTHOR_EMAIL,
      label: t('YOUR_EMAIL'),
      margin: 'dense',
      type: 'email',
    },
    {
      id: 'target-input',
      margin: 'dense',
      name: RequestActivityNameEnum.TARGET_NAME,
      label: t('NAME_TARGET'),
      type: 'text',
    },
  ]
}

export default valuesInputsModalRequestActivity
