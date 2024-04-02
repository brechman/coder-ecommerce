import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import data from "../data/products.json";

export const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            try {
               const response = await new Promise((resolve, reject) => {
                    setTimeout(() => resolve(data), 2000);
                });
                const filteredData = response.find((d) => d.id === Number(id));
           
                if (filteredData) {
                    setProduct(filteredData);
                } else {
                         console.log(`No se encontró el producto con id ${id}`);
                }
            } catch (error) {
                       console.error('Error al obtener el producto:', error);
            }
        };

        getProduct();
    }, [id]);

    if (!product) return null;

    const formattedPrice = product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 });

    return (
        <Container className='mt-4 text-center itemContainer'>
            <Card className='itemCard'>
                <Card.Img variant="top" src={product.imagen} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        Categoría: {product.description}
                    </Card.Text>
                    <Card.Text>Precio: S/. {formattedPrice}</Card.Text> 
                </Card.Body>
            </Card>
        </Container>
    );
};