import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import { Link } from 'react-router-dom';
import ItemProductoDialog from './ItemProductoDialog'; 

export const Item = ({ product }) => {
    const formattedPrice = product.price.toLocaleString('es-ES', { minimumFractionDigits: 2 });

    return (
        <Card className='card'>
            <Card.Img variant="top" src={product.imageUrl} /> {/* Aquí utilizamos "imageUrl" en lugar de "imagen" */}
            <Card.Body>
                <Card.Title>{product.title}</Card.Title> {/* Utilizamos "title" en lugar de "name" */}
                <Card.Text>
                    {product.description}
                </Card.Text>
                <Card.Text>Precio: S/. {formattedPrice}</Card.Text> 
                <ItemProductoDialog product={product} />
            </Card.Body>
        </Card>
    );
};
