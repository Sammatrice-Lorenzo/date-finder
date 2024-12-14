import { FormValidatorInterface } from '@/interfaces/form/FormValidatorInterface'

export default class FormValidatorService
{
  private validators: FormValidatorInterface[]

  constructor(validators: FormValidatorInterface[]) {
    this.validators = validators
  }
  
  public validate(formData: FormData, setError: CallableFunction): boolean
  {
    const formJson: {
      [k: string]: FormDataEntryValue;
    } = Object.fromEntries(formData.entries())

    for (const validator of this.validators) {
      if (!validator.validate(formJson, setError)) return false
    }

    return true
  }
}
