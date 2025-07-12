type InformationUserEmail = {
  name: string
  email: string
}

type AttachementEmail = {
  name: string
  content: string
}

export default interface BrevoEmailParametersInteface {
  to: InformationUserEmail[]
  sender: InformationUserEmail
  subject: string
  htmlContent: string
  attachment?: AttachementEmail[]
}
