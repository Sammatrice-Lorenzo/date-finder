import { FormControl, FormHelperText, TextField } from '@mui/material'
import { Controller, FieldError, FieldValues, FormState, UseFormReturn } from 'react-hook-form'
import { InputModalRequestActivity } from '@/interfaces/InputModalRequestActivity'
import { FormRequestActivityInterface } from '@/interfaces/activity/FormRequestActivityInterface'

type FormControlRequestActivityProps = {
  form: UseFormReturn<FormRequestActivityInterface>,
  input: InputModalRequestActivity
}

const FormControlRequestActivity = ({ input, form, }: FormControlRequestActivityProps): React.ReactElement => {

  const formState: FormState<FieldValues> = form.formState
  const errorInput = formState.errors[input.name]  

  return (
    <FormControl fullWidth margin='dense' error={!!errorInput}>
      <Controller
        name={input.name}
        control={form.control}
        render={({ field }) => (
          <TextField {...field}
            label={input.label}
            type={input.type}
            margin={input.margin}
            variant='outlined'
            error={!!errorInput}
            slotProps={{ ...input.props }}
            fullWidth
            required
          />
        )}
      />
      {errorInput && <FormHelperText>{(errorInput as FieldError).message}</FormHelperText>}
    </FormControl>
  )
}

export default FormControlRequestActivity