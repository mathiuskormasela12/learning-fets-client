'use client'
// ========= Home Page
// import all packages
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { client } from '@/helpers/client'

// import all components
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { type NormalizeOAS, type OASOutput } from 'fets'
import { type openapi } from '@/open-api/openapi-spec'

const HomePage: React.FC = () => {
  type ContactResponse = OASOutput<NormalizeOAS<typeof openapi>, '/api/contacts', 'get', 200>
  const [contacts, setContact] = useState<ContactResponse>()

  const getContacts = async (): Promise<boolean> => {
    const result = await client['/api/contacts'].get() as ContactResponse

    setContact(result)
    return true
  }

  useEffect(() => {
    getContacts()
  }, [])

  const deleteContact = async (contactId: string | undefined): Promise<void> => {
    if (typeof contactId === 'string') {
      try {
        await client['/api/contact/{contactId}'].delete({
          params: {
            contactId
          }
        })
        getContacts()
      } catch {
        window.alert('Failed')
      }
    }
  }

  return (
    <>
      <Container>
        <Row className='mt-5'>
          <Col md={12}>
            <h1 className='display-6'>Contact List</h1>
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Contact Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {contacts?.data?.map((contact, index) => (
                   <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.contact_name}</td>
                    <td>{contact.phone_number}</td>
                    <td>{contact.email}</td>
                    <td>{moment(contact.created_at).format('D MMMM YYYY')}</td>
                    <td>
                      <Button type="button" variant='danger' onClick={async () => { await deleteContact(contact.id) }}>
                        Delete
                      </Button>
                      <Link href={`/contact/edit/${contact?.id ?? ''}`} className="btn btn-primary d-inline-block">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
