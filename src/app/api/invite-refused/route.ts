import ActivityEventCalendarInterface from '@/interfaces/ActivityEventCalendarInterface';
import sgMail from '@sendgrid/mail';
import { MailData } from "@sendgrid/helpers/classes/mail";
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import fr from '../../../../public/locales/fr/common.json';
import MailEventService from '@/services/MailEventService';

export async function POST(req: Request, res: NextApiResponse) {
  const body: ActivityEventCalendarInterface = await req.json()

  try {
    const apiKey: string | undefined = process.env.API_KEY_SEND_GRID
    if (!apiKey) {
      return res.status(500).json({error: 'API KEY not found'})
    }
    sgMail.setApiKey(apiKey)

    const email: MailData = MailEventService.createEmailRefuseInvitation(body)
    console.log(email);
    
    let codeResponse: number = 202
    const responseEmail = await sgMail.send(email)
    console.log(responseEmail);

    let message: string = fr.SUCCESS.EMAIL
    if (codeResponse !== 202) {
      message = fr.ERROR.EMAIL_ERROR
      codeResponse = responseEmail[0].statusCode
    }
    
    return NextResponse.json({ message: message }, { status: codeResponse })
  } catch (error) {
    return NextResponse.json({ message: fr.ERROR.SERVER_ERROR }, { status: 500 })
  }
}
