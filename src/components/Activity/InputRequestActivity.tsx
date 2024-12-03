import { SlotProps, StepContextType, TextField } from '@mui/material'
import React, { ComponentState } from 'react'

export type InputRequestActivityProps = {
  name: string,
  type: string,
  label: string,
  props?: SlotProps<'div', ComponentState, StepContextType>,
  margin?: 'none' | 'dense' | 'normal'
}

export function InputRequestActivity({ name, type, label, props, margin}: Readonly<InputRequestActivityProps> ): React.ReactElement
{
  return (
    <TextField
      name={name}
      type={type}
      required
      margin={margin}
      fullWidth
      label={label}
      variant='outlined'
      sx={{ my: 1 }}
      slotProps={{...props}}
    />
  )
}