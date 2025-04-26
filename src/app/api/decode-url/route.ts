import { NextResponse } from 'next/server'
import { UrlActivityGeneratorService } from '@/services/UrlActivityGeneratorService'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import type { NextResponseUrlActivityDecodedType } from '@/types/NextResponseUrlActivityDecodedType'
import type { ErrorResponseType } from '@/types/ErrorResponseType'

type UrlActivityToken = {
  token: string | null
}

export async function POST(
  req: Request
): Promise<NextResponse<NextResponseUrlActivityDecodedType | ErrorResponseType>> {
  const body: UrlActivityToken = await req.json()
  const token: string | null = body.token

  const errorResponse: NextResponse<ErrorResponseType> = NextResponse.json(
    { error: 'Invalid token' },
    { status: 400 }
  )
  if (!token) {
    return errorResponse
  }

  const routerParameters: ActivityQueryProps | null =
    new UrlActivityGeneratorService().decodeParametersRouteRequestActivity(token)

  if (!routerParameters) {
    return errorResponse
  }

  return NextResponse.json({ response: routerParameters }, { status: 200 })
}
