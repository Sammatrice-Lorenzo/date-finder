'use client'

import { InputModalRequestActivity } from '@/interfaces/InputModalRequestActivity'
import DateValidatorService from './validator/DateValidatorService'
import RequiredFieldFormService from './validator/RequiredFieldFormService'
import FormValidatorService from './validator/FormValidatorService'

export class RequestActivityFormService {

  public static areFormFieldsValid(formData: FormData, setError: CallableFunction): boolean
  {
    const propertiesForm: string[] = [
      'date',
      'author-name',
      'author-email',
      'target-name'
    ]

    const formValidator = [
      new RequiredFieldFormService(propertiesForm),
      new DateValidatorService()
    ]
    const formServiceValidator = new FormValidatorService(formValidator)

    return formServiceValidator.validate(formData, setError)
  }

  public static getValuesInputsModalRequestActivity(): InputModalRequestActivity[]
  {
    return [
      {
        id: 'date-input',
        name: 'date',
        label: 'Date',
        type: 'datetime-local',
        margin: 'none',
        props: {
          inputLabel: {
            shrink: true,
          }
        }
      },
      {
        id: 'author-input',
        name: 'author-name',
        label: 'Votre nom',
        margin: 'dense',
        type: 'text'
      },
      {
        id: 'author-email',
        name: 'author-email',
        label: 'Votre email',
        margin: 'dense',
        type: 'email'
      },
      {
        id: 'target-input',
        margin: 'dense',
        name: 'target-name',
        label: 'Nom de la personne invitée',
        type: 'text'
      }
    ] 
  }
}