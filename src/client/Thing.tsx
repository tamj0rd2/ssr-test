import React from 'react'
import styled from 'styled-components'

interface ThingProps {
  message: string
}

const H1 = styled.h1`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`

const Thing: React.FC<ThingProps> = ({ message }) => {
  return <H1>{message} (Rendered from from Thing.tsx)</H1>
}

export default Thing
