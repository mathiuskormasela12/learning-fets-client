'use client'
// ========= Home Page
// import all packages
import React from 'react'
import Link from 'next/link'

// import all components
import { Container, Row, Col, Table, Button } from 'react-bootstrap'

const HomePage: React.FC = () => {
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
                <tr>
                  <td>1</td>
                  <td>Yerin</td>
                  <td>08239393933</td>
                  <td>jhon@mail.com</td>
                  <td>20 January 2022</td>
                  <td>
                    <Button type="button" variant='danger'>
                      Delete
                    </Button>
                    <Link href={`/contact/edit/${'020220'}`} className="btn btn-primary d-inline-block">
                      Edit
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
