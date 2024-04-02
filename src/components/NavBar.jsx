import { NavLink } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { CartWifget } from './CartWidget';


export const NavBar = () => {
  return ( 
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">LIQUOR SHOP</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/home">Inicio</Nav.Link>
          <Nav.Link as={NavLink} to="/">Productos</Nav.Link>
          <Nav.Link as={NavLink} to="/contact">Contacto</Nav.Link>
        </Nav>
        
        <CartWifget />
        <Badge bg="secondary">15</Badge>
        
      </Container>
    </Navbar>
  );
};