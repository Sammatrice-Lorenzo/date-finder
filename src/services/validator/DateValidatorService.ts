import { FormValidatorInterface } from '@/interfaces/form/FormValidatorInterface'
import fr from '../../locales/fr/common.json'
export default class DateValidatorService implements FormValidatorInterface
{
  public validate(formJson: Record<string, FormDataEntryValue>, setError: CallableFunction): boolean
  {
    const dateValue: FormDataEntryValue = formJson['date']
    let returnValue: boolean = true
    if (!dateValue) {
      setError(fr.ERROR.FORM_REQUEST_ACTIVITY.MISSING_DATE)

      return false
    }

    const date: Date = new Date(dateValue.toString())
    const now: Date = new Date()

    if (isNaN(date.getTime())) {
      setError(fr.ERROR.FORM_REQUEST_ACTIVITY.INVALID_DATE)
      returnValue = false
    }

    if (date < now) {
      setError(fr.ERROR.FORM_REQUEST_ACTIVITY.FUTURE_DATE_REQUIREMENT)
      returnValue = false
    }

    return returnValue
  }
}