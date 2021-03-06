import React from 'react'
import { Carousel, Container, Row, Col, Accordion } from 'react-bootstrap'
import image from '../../images/background.jpg'
import image2 from '../../images/background2.jpg'
import image3 from '../../images/background3.jpg'
import './Bootstrap.css'

export default function Bootstrap() {
    return (
        <section className='bootstrap'>
            <main>
                <Carousel controls={false} fade>
                    <Carousel.Item>
                        <img src={image} alt='First Slide' className='d-block w-100' />
                        <Carousel.Caption>
                            <h3>First Slide</h3>
                            <p>This is an example caption</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image2} alt='Second Slide' className='d-block w-100' />
                        <Carousel.Caption>
                            <h3>Second Slide</h3>
                            <p>This is an example caption</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image3} alt='Third Slide' className='d-block w-100' />
                        <Carousel.Caption>
                            <h3>Third Slide</h3>
                            <p>This is an example caption</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br/>
                <Container>
                    <Row>
                        <Col md={{span: 8, offset: 2}}>
                            {/* This is where we will place the accordian */}
                            <Accordion defaultActiveKey="0" className='m-4'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <h4>Step 1 - Install the react-bootstrap package</h4>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>Install both bootstrap and react-bootstrap with 'npm install react-bootstrap bootstrap'</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <h4>Step 2 - Import the components you want to use.</h4>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p><a href="https://react-bootstrap.github.io" target="_blank" rel="noreferrer">Visit here for the docs</a></p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        <h4>Step 3 - Call to the components to render in the return.</h4>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>Using the code examples from their docs, call to the components as needed to implement Bootstrap components in your UI.</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                    <Row className="text-center m-2">
                        <Col md={3} className="alert alert-primary">
                            <h4>col-md-3<hr />will take 3 of 12 columns in the grid</h4>
                        </Col>
                        <Col md={6} className="alert alert-danger">
                            <h4>col-md-6<hr />will take 6 of 12 columns in the grid</h4>
                        </Col>
                        <Col md={3} className="alert alert-success">
                            <h4>col-md-3<hr />will take 3 of 12 columnns in the grid</h4>
                        </Col>
                    </Row>
                    <Row className="text-center m-2">
                        <Col md={6} className="alert alert-warning">This will take half the parent's width.</Col>
                        <Col md={6} className="alert alert-info">This will take half the parent's width.</Col>
                    </Row>
                </Container>
            </main>
        </section>
    )
}
