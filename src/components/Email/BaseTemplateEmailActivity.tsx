import { TranslatorEmailActivityType } from '@/types/email/TranslatorEmailActivityType'
import { main, container, header, content, footer } from '@/styles/email/emailStyle'

import { Html, Head, Preview, Body, Container, Section, Text } from '@react-email/components'
import * as React from 'react'

export type TemplateEmailProps = {
  t: TranslatorEmailActivityType
  children: React.ReactNode
}

const BaseTemplateEmailActivity = ({ t, children }: TemplateEmailProps) => {
  const year: number = new Date().getFullYear()

  return (
    <Html lang='fr'>
      <Head />
      <Preview>{t.title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>{t.title}</Section>
          <Section style={content}>
            {children}
            <Text>{t.regards}</Text>
            <Text>DateFinder</Text>
          </Section>
          <Section style={footer}>©{year} DateFinder</Section>
        </Container>
      </Body>
    </Html>
  )
}

export default BaseTemplateEmailActivity
