'use client'
import { useParams } from 'next/navigation'
// =========== Edit Contact
// import all pages
import React from 'react'

// import all bootstrap components
import { Col, Container, Row, Form, Button } from 'react-bootstrap'

const EditContact: React.FC = () => {
  const params = useParams()
  console.log(params.contactId)
  return (
    <>
      <Container>
        <Row>
          <Col md={12} className="my-3">
            <h1>Edit Contact</h1>
          </Col>
          <Col md={12}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Contact Name</Form.Label>
                <Form.Control type="text" placeholder="Enter contact name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone number" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EditContact
