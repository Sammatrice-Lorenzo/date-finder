import { NextResponse } from 'next/server'
import fr from '../../../locales/fr/common.json'
import { UrlActivityGeneratorService } from '@/services/UrlActivityGeneratorService'
import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import type { ShareDataInterface } from '@/interfaces/ShareDataInterface'
import type { NextResponseShareDateType } from '@/types/NextResponseShareDateType'
import type { FormRequestActivityInterface } from '@/interfaces/activity/FormRequestActivityInterface'

interface UrlActivityParameters {
  activity: ActivityInterface
  form: FormRequestActivityInterface
  baseUrl: string
}

export async function POST(req: Request): Promise<NextResponse<NextResponseShareDateType>> {
  const body: UrlActivityParameters = await req.json()
  const urlToken: string = new UrlActivityGeneratorService().generateParametersActivityForShare(
    body.activity,
    body.form
  )

  const shareData: ShareDataInterface = {
    title: fr.ACTIVITY.TITLE_LINK_SHARED,
    url: `${body.baseUrl}/activity?token=${urlToken}`,
  }

  return NextResponse.json({ response: shareData }, { status: 200 })
}
