import React from 'react'

const Header = () => <div>Header</div>
const Footer = () => <div>Footer</div>

interface AppProps {
  data: {}
}

const App: React.FC<AppProps> = ({ children, data }) => {
  return (
    <>
      <div></div>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default App
