'use client'
import { AlertEnum } from "@/enums/AlertEnum";
import LocationFormatter from "@/formatters/LocationFormatter";
import ActivityInterface from "@/interfaces/ActivityInterface";
import { InputModalRequestActivity } from "@/interfaces/InputModalRequestActivity";
import { ShareDataInterface } from "@/interfaces/ShareDataInterface";
import { ActivityQueryProps } from "@/types/ActivityQueryProps";

export class RequestActivityFormService {

  public static areFormFieldsValid(formData: FormData, showAlert: CallableFunction): boolean
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
        alert('Veuillez remplir tous les champs !')
        return false
      }

      if (property === 'date' && new Date(formJson[property].toString()) < now) {
        showAlert('La date doit être supérieure ou égale à la date actuelle !', AlertEnum.Error)
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

  public static generateParametersActivityForShare(activity: ActivityInterface, formData: FormData, baseUrl: string): ShareDataInterface
  {
    const formJson: {
      [k: string]: FormDataEntryValue;
    } = Object.fromEntries(formData.entries())

    const dateFormatted: Date = new Date(formJson['date'].toString())
    const route = {
      activityId: encodeURIComponent(activity.id),
      activityName: encodeURIComponent(activity.name),
      authorName: encodeURIComponent(formJson['author-name'].toString()),
      authorEmail: encodeURIComponent(formJson['author-email'].toString()),
      targetName: encodeURIComponent(formJson['target-name'].toString()),
      date: encodeURIComponent(`${dateFormatted.toLocaleDateString()} ${dateFormatted.toLocaleTimeString()}`),
      location: encodeURIComponent(LocationFormatter.getAddressBusinessActivity(activity.location))
    }

    return {
      title: 'Invitation pour une sortie',
      text: 'Découvre notre prochaine activité ensemble!',
      url: `${baseUrl}/activity/${route.activityId}/${route.activityName}/${route.authorName}/${route.authorEmail}/${route.targetName}/${route.date}/${route.location}`,
    }
  }

  public static decodeParametersRouteRequestActivity(routerParameter: ActivityQueryProps): ActivityQueryProps
  {
    return {
      activityId: decodeURIComponent(routerParameter.activityId),
      activityName: decodeURIComponent(routerParameter.activityName),
      authorName: decodeURIComponent(routerParameter.authorName),
      authorEmail: decodeURIComponent(routerParameter.authorEmail),
      targetName: decodeURIComponent(routerParameter.targetName),
      date: decodeURIComponent(routerParameter.date),
      location: decodeURIComponent(routerParameter.location)
    }
  }
}