import React from 'react'

export interface ContentProps {
  greeting: string
}

const Content: React.FC<ContentProps> = ({ greeting }) => (
  <>
    <h1>{greeting} (All the way from Content.tsx)</h1>
    <h2>This component contains all of our actual page content, excluding layout stuffs</h2>
    <p>Pressing the button below should alert you. If it doesn't, hydration isn't working correctly</p>
    <button onClick={() => alert(':D')}>Push me!</button>
  </>
)

export default Content
