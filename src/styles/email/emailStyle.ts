const main = {
  backgroundColor: '#f4f4f4',
  fontFamily: 'Arial, sans-serif',
  margin: 0,
  padding: '20px 0',
}

const container = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  maxWidth: '600px',
  margin: '0 auto',
  overflow: 'hidden',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
}

const header = {
  backgroundColor: '#d33252',
  color: '#ffffff',
  padding: '20px',
  textAlign: 'center' as const,
  fontSize: '24px',
  fontWeight: 'bold' as const,
}

const content = {
  padding: '20px',
  fontSize: '16px',
  color: '#333333',
  lineHeight: '1.6',
}

const footer = {
  backgroundColor: '#f4f4f4',
  textAlign: 'center' as const,
  padding: '10px',
  fontSize: '12px',
  color: '#777777',
}

export { main, container, header, content, footer }
