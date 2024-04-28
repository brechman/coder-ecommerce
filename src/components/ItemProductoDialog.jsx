import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../context/CartContext';


const ItemProductoDialog = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const [cantidad, setCantidad] = useState(1);
    const { addCart } = useContext(CartContext);
    //addCart(product, quantity);

    const handleShowDialog = () => setShowModal(true);
    const handleCloseDialog = () => setShowModal(false);

    const handleAddToCart =async () => {    
        addCart(product, cantidad); 
        handleCloseDialog();
    };
  
    const formattedPrice = product.price.toLocaleString('es-ES', { minimumFractionDigits: 2 });

    const handleCantidadChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setCantidad(value);
        }
    };

    const total = (cantidad * product.price).toLocaleString('es-ES', { minimumFractionDigits: 2 });


    return (
        <>
            <Button className="button" variant="primary" onClick={handleShowDialog}>Ver Producto</Button>

            <Modal show={showModal} onHide={handleCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '100%', height: 'auto' }} />
                    <p>{product.description}</p>
                    <p>Precio: S/. {formattedPrice}</p>
                    <p>Stock Actual: {product.stock}</p>
                    <p>Cantidad:
                        <input
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={handleCantidadChange}
                            style={{ marginLeft: '0.5rem', width: '4rem' }}
                        />
                    </p>
                    <p>Total: S/. {total}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDialog}>Cerrar</Button>
                    <Button variant="primary" onClick={handleAddToCart}>Agregar al Carrito</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ItemProductoDialog;