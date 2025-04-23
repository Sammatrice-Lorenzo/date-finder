import type { RequestActivityNameEnum } from '@/enums/RequestActivityNameEnum'

export interface InputModalRequestActivity {
  id: string
  name: RequestActivityNameEnum
  label: string
  type: string
  margin: 'none' | 'dense' | 'normal'
  props?: {
    inputLabel: {
      shrink: boolean
    }
  }
}
