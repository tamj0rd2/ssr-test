import React from 'react'
import styled from 'styled-components'
import Content, { ContentProps } from './Content'
import ErrorPage, { ErrorPageProps } from './Error'

export type AppProps = ErrorPageProps | ContentProps

const App: React.FC<AppProps> = props => {
  // TODO: test if loadable stuff even works
  const PageContent = () => ('errorStatusCode' in props ? <ErrorPage {...props} /> : <Content {...props} />)

  return (
    <Container>
      <Header />
      <PageContent />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`

const Header = () => (
  <ul>
    <li>
      <a href="/">Go to main app page</a>
    </li>
    <li>
      <a href="/500">Go to a 500 error page</a>
    </li>
    <li>
      <a href="/404">Go to a 404 error page</a>
    </li>
  </ul>
)
const Footer = () => <p>A super informative footer</p>

export default App
