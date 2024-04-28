
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useProductList } from '../hook/useProductList'; // Importa el hook useProductList
import { useCategoriaList } from '../hook/useCategoriaList';
import { ItemList } from './ItemList';

export const ItemListContainer = () => {
    const { id } = useParams();
    const { categorias } = useCategoriaList();
    const { productos, loading, error } = useProductList(id); // Utiliza el hook useProductList

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container className='container'>
                    <Nav className="justify-content-center">
            <Nav.Item>
                    <Nav.Link as={NavLink} to="/category/Todos">Todos</Nav.Link>
                </Nav.Item>
                {categorias.map(category => (
                    <Nav.Item key={category}>
                        <Nav.Link as={NavLink} to={`/category/${category}`}>{category}</Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            <ItemList products={productos} />
        </Container>
    );
};


/* backup

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
}*/