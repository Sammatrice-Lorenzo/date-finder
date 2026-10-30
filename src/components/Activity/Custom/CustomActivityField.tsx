'use client'

import { FormControl, FormHelperText, TextField } from '@mui/material'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type React from 'react'
import type FormCustomActivityInterface from '@/interfaces/activity/FormCustomActivityInterface'

export type CustomActivityFieldProps = {
  form: UseFormReturn<FormCustomActivityInterface>
  name: keyof FormCustomActivityInterface
  label: string
  maxLength: number
  required: boolean
}

export default function CustomActivityField({
  form,
  name,
  label,
  maxLength,
  required,
}: Readonly<CustomActivityFieldProps>): React.ReactElement {
  const error = form.formState.errors[name]

  return (
    <FormControl fullWidth margin='dense' error={!!error}>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            id={`custom-activity-${name}`}
            label={label}
            variant='outlined'
            error={!!error}
            required={required}
            slotProps={{ htmlInput: { maxLength } }}
            fullWidth
          />
        )}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  )
}
