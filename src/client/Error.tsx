import React from 'react'

export interface ErrorPageProps {
  errorStatusCode: number
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorStatusCode }) => (
  <>
    <h1>A big fat {errorStatusCode} error occurred!</h1>
    <button onClick={() => alert(`You're on the ${errorStatusCode} error page`)}>Click me</button>
  </>
)

export default ErrorPage
