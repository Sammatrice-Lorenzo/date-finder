'use client'
import { InputModalRequestActivity } from "@/interfaces/InputModalRequestActivity";

export class RequestActivityFormService {

  public static areFormFieldsValid(formData: FormData, setError: CallableFunction): boolean
  {
    const propertiesForm: string[] = [
      'date',
      'author-name',
      'author-email',
      'target-name'
    ]

    const now: Date = new Date()

    const formJson: {
      [k: string]: FormDataEntryValue;
    } = Object.fromEntries(formData.entries())

    for (const property of propertiesForm) {
      if (!formJson[property]) {
        setError('Veuillez remplir tous les champs !')
        return false
      }

      if (property === 'date' && new Date(formJson[property].toString()) < now) {
        setError('La date doit être supérieure ou égale à la date actuelle !')
        return false
      }
    }

    return true
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