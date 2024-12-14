import { NextResponse } from 'next/server'
import fr from '../../../locales/fr/common.json'
import { UrlActivityGeneratorService } from '@/services/UrlActivityGeneratorService'
import ActivityInterface from '@/interfaces/ActivityInterface'
import { ShareDataInterface } from '@/interfaces/ShareDataInterface'

interface UrlActivityParameters {
  activity: ActivityInterface,
  form: Record<string, string>,
  baseUrl: string
}

export async function POST(req: Request): Promise<NextResponse<{
  response: ShareDataInterface
}>> {
  const body: UrlActivityParameters = await req.json()
  const urlToken: string = UrlActivityGeneratorService.generateParametersActivityForShare(body.activity, body.form)

  const shareData: ShareDataInterface = {
    title: fr.ACTIVITY.TITLE_LINK_SHARED,
    text: fr.ACTIVITY.DISCOVER_ACTIVITY,
    url: `${body.baseUrl}/activity/${urlToken}`,
  }

  return NextResponse.json({ response: shareData }, { status: 200 })
}
