import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import { Link } from 'react-router-dom';

export const Item = ({product}) => {

    const formattedPrice = product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 });

    return(
    <Card className='card'>
      <Card.Img variant="top" src={product.imagen} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Card.Text>Precio: S/. {formattedPrice}</Card.Text> 
                 <Link to={`/item/${product.id}`}><Button className= "button" variant="primary">Ver Producto</Button></Link>
      </Card.Body>
    </Card>
  );
}