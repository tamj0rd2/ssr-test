import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`

// TODO: get this working with some initial data. Maybe add react router
const App: React.FC = () => {
  return (
    <Container>
      <h1>Hello, world! (from App.ts)</h1>
      <button onClick={() => alert(':D')}>Push me!</button>
    </Container>
  )
}

export default App
