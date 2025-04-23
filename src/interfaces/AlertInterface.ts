import type { AlertEnum } from '@/enums/AlertEnum'

export default interface AlertInterface {
  description: string
  severity: AlertEnum
}
