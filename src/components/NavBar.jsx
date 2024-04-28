import { NavLink } from 'react-router-dom'; 
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import  CartWidget  from './CartWidget';
import { CartContext } from '../context/CartContext';

export const NavBar = ({  }) => {

  const { cart } = useContext(CartContext);

  const totalProducts = cart.reduce(
    (total, products) => total + products.quantity,
    0
  );
  return ( 
    <Navbar bg="primary" data-bs-theme="dark"  style={{ zIndex: 100 }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">LIQUOR SHOP</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/home">Inicio</Nav.Link>
          <Nav.Link as={NavLink} to="/">Productos</Nav.Link>
          <Nav.Link as={NavLink} to="/contact">Contacto</Nav.Link>
        </Nav>
        
        <CartWidget />
        <Badge bg="secondary">{totalProducts}</Badge>
        
      </Container>
    </Navbar>
  );
};