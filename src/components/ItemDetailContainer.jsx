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
                // Simulamos una petición a una API con un retraso de 2 segundos
                const response = await new Promise((resolve, reject) => {
                    setTimeout(() => resolve(data), 2000);
                });

                // Buscamos el producto por su id en los datos
                const filteredData = response.find((d) => d.id === Number(id));
                
                // Si encontramos el producto, lo establecemos en el estado
                if (filteredData) {
                    setProduct(filteredData);
                } else {
                    // Si no se encuentra el producto, puedes manejarlo aquí
                    console.log(`No se encontró el producto con id ${id}`);
                }
            } catch (error) {
                // Manejo de errores
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