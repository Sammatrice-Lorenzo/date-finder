import { FormValidatorInterface } from "@/interfaces/form/FormValidatorInterface"

export default class RequiredFieldFormService implements FormValidatorInterface
{
  private requiredFields: string[]

  constructor(requiredFields: string[]) {
    this.requiredFields = requiredFields
  }

  public validate(formJson: Record<string, FormDataEntryValue>, setError: CallableFunction): boolean
  {
    for (const property of this.requiredFields) {
      if (!formJson[property]) {
        setError(`Le champ ${property} est obligatoire`)
        return false
      }
    }

    return true
  }
}