'use client'
// ========== Navbar
// import all packages
import React from 'react'
import { useRouter } from 'next/navigation'

// import all bootstrap components
import { Navbar as BsNavbar, Container, Nav } from 'react-bootstrap'

export const Navbar: React.FC = () => {
  const router = useRouter()

  const handleNavigate = (path: string): void => { router.push(path) }

  return (
    <BsNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <BsNavbar.Brand href="#home">Contact</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => { handleNavigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { handleNavigate('/contact/add') }}>Add Contact</Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}
