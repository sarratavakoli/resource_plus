import React from 'react'
import { Container, Row } from 'react-bootstrap'
import RouterInfo from './RouterInfo'
import './Routing.css'

export default function Routing() {
  return (
    <section className="routing">
      <article className="text-center m-0 p-5 bg-info">
        <h1>Routing and Authentication</h1>
        <a href="https://reactrouter.com/web/guides/quick-start" target="_blank" rel="noreferrer" className="btn btn-outline-dark m-1">Routing Docs</a>
        <a href="https://firebase.google.com/docs/auth/web/github-auth?authuser=0" target="_blank" rel="noreferrer" className="btn btn-light m-1">Authentication</a>
      </article>
      <Container>
        <Row>
          <RouterInfo />
        </Row>
      </Container>
    </section>
  )
}
