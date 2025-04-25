import { NextResponse } from 'next/server'
import { UrlActivityGeneratorService } from '@/services/UrlActivityGeneratorService'
import { ActivityQueryProps } from '@/types/ActivityQueryProps'

type UrlActivityToken = {
  token: string | null
}

type ErrorResponse = {
  error: string
}

export type UrlActivityDecoded = {
  response: ActivityQueryProps
}

export async function POST(
  req: Request
): Promise<NextResponse<UrlActivityDecoded | ErrorResponse>> {
  const body: UrlActivityToken = await req.json()
  const token: string | null = body.token

  const errorResponse: NextResponse<ErrorResponse> = NextResponse.json(
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
