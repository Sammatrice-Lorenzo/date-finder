import { NextResponse } from 'next/server'
import { UrlActivityGeneratorService } from '@/services/UrlActivityGeneratorService'
import type { ShareDataInterface } from '@/interfaces/ShareDataInterface'
import type { NextResponseShareDateType } from '@/types/NextResponseShareDateType'
import { getTranslations } from 'next-intl/server'
import { generateUrlRequestSchema } from '@/schema/apiActivitySchema'

export async function POST(
  req: Request
): Promise<NextResponse<NextResponseShareDateType | { message: string }>> {
  const parsedBody = generateUrlRequestSchema.safeParse(await req.json().catch(() => null))
  if (!parsedBody.success) {
    const translateError = await getTranslations('ERROR')
    return NextResponse.json({ message: translateError('INVALID_REQUEST') }, { status: 400 })
  }

  const body = parsedBody.data
  const urlToken: string = new UrlActivityGeneratorService().generateParametersActivityForShare(
    body.activity,
    body.form
  )

  const t = await getTranslations('ACTIVITY')

  const shareData: ShareDataInterface = {
    title: t('TITLE_LINK_SHARED'),
    url: `${body.baseUrl}/activity?token=${urlToken}`,
  }

  return NextResponse.json({ response: shareData }, { status: 200 })
}
