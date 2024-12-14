export interface FormValidatorInterface {
  validate(formJson: Record<string, FormDataEntryValue>, setError: CallableFunction): boolean
}
