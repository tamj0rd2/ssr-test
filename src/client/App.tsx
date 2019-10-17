import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`

export default function App() {
  return (
    <Container>
      <h1>Hello, world! (from App.ts)</h1>
      <button onClick={() => alert(':D')}>Push me!</button>
    </Container>
  )
}
