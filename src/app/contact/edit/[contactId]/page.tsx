'use client'
import { client } from '@/helpers/client'
import { useParams, useRouter } from 'next/navigation'
// =========== Edit Contact
// import all pages
import React, { useState, type ChangeEvent, useEffect, type FormEvent } from 'react'
import { type OASOutput, type NormalizeOAS } from 'fets'
import { type openapi } from '@/open-api/openapi-spec'

// import all bootstrap components
import { Col, Container, Row, Form, Button } from 'react-bootstrap'

type ContactResponse = OASOutput<NormalizeOAS<typeof openapi>, '/api/contact/{contactId}', 'get', 200>

const EditContact: React.FC = () => {
  const params = useParams()
  const router = useRouter()

  const [state, setState] = useState({
    contactName: '',
    email: '',
    phoneNumber: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>, name: string): void => {
    setState((state) => ({
      ...state,
      [name]: event.target.value
    }))
  }

  useEffect(() => {
    const getContact = async (): Promise<void> => {
      try {
        const result = await client['/api/contact/{contactId}'].get({
          params: {
            contactId: params.contactId as string
          }
        }) as ContactResponse

        setState((state) => ({
          ...state,
          contactName: result.data?.contact_name ?? '',
          email: result.data?.email ?? '',
          phoneNumber: result.data?.phone_number ?? ''
        }))
      } catch {
        window.alert('Failed')
      }
    }

    getContact()
  }, [])

  const updateContact = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      const res = await client['/api/contact/{contactId}'].put({
        params: {
          contactId: params.contactId as string
        },
        json: {
          contact_name: state.contactName,
          email: state.email,
          phone_number: state.phoneNumber
        }
      })
      console.log(res)
      router.push('/')
    } catch {
      window.alert('Failed')
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={12} className="my-3">
            <h1>Edit Contact</h1>
          </Col>
          <Col md={12}>
            <Form onSubmit={updateContact}>
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

export default EditContact
