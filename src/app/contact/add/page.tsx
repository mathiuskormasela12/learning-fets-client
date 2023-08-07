'use client'
import { client } from '@/helpers/client'
import { useRouter } from 'next/navigation'
// =========== Add Contact
// import all pages
import React, { type ChangeEvent, useState, type FormEvent } from 'react'

// import all bootstrap components
import { Col, Container, Row, Form, Button } from 'react-bootstrap'

const AddContact: React.FC = () => {
  const router = useRouter()
  const [state, setState] = useState({
    contactName: '',
    email: '',
    phoneNumber: ''
  })

  const addContact = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const response = await client['/api/contact'].post({
      json: {
        contact_name: state.contactName,
        email: state.email,
        phone_number: state.phoneNumber
      }
    })

    if (!response.ok) {
      window.alert('Failed')
    } else {
      await response.json()
      router.push('/')
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>, name: string): void => {
    setState((state) => ({
      ...state,
      [name]: event.target.value
    }))
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={12} className="my-3">
            <h1>Add Contact</h1>
          </Col>
          <Col md={12}>
            <Form onSubmit={addContact}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact name"
                  value={state.contactName}
                  onChange={(e) => { handleChange(e as never, 'contactName') }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={state.email}
                  onChange={(e) => { handleChange(e as never, 'email') }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={state.phoneNumber}
                  onChange={(e) => { handleChange(e as never, 'phoneNumber') }}
                />
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

export default AddContact
