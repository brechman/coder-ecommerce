import { useEffect, useState } from 'react';
import { useParams,NavLink  } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'; // Importa Nav de react-bootstr
import data from "../data/products.json";
import { ItemList } from './ItemList';


export const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const get = new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 2000);
        });

        get.then ((data) => {
            if(id){
                const filteredData = data.filter (d => d.category === id);
                setProducts(filteredData);
            } else {
                setProducts(data);
            }             
        });
    },[id]);

    return (
        <Container className='container'  >
              <Nav className="justify-content-center">
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/category/regular">Regular</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/category/premium">Premium</Nav.Link>
                </Nav.Item>
            </Nav>
               {products !== null && <ItemList products={products}/>}
        </Container>
    )
}