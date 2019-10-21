import React from 'react'
import styled from 'styled-components'
import { ContentProps } from './Content'
import { ErrorPageProps } from './Error'
import loadable from '@loadable/component'

export type AppProps = ErrorPageProps | ContentProps

const App: React.FC<AppProps> = props => {
  let PageContent: () => JSX.Element

  if ((props as ErrorPageProps).errorStatusCode) {
    const ErrorPage = loadable(() => import('./Error'))
    PageContent = () => <ErrorPage {...(props as ErrorPageProps)} />
  } else {
    const Content = loadable(() => import('./Content'))
    PageContent = () => <Content {...(props as ContentProps)} />
  }

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
