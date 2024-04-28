import React, { useState, useEffect } from 'react';

const ItemDetailCart = ({ cartItems, onRemoveItem, onUpdateQuantity, onConfirmPurchase }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    const calculateTotalPrice = () => {
        if (!cartItems) return;
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total);
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        onUpdateQuantity(itemId, newQuantity);
    };

    const handleConfirmPurchase = () => {
        onConfirmPurchase();
    };

    const renderCartItems = () => {
        if (!cartItems || cartItems.length === 0) {
            return <p>El carrito está vacío.</p>;
        }

        return cartItems.map(item => (
            <div key={item.id}>
                <p>{item.name}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio unitario: ${item.price}</p>
                <button onClick={() => onRemoveItem(item.id)}>Quitar</button>
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                />
            </div>
        ));
    };

    return (
        <div className={`item-detail-cart ${showCart ? 'show' : ''}`}>
            <button className="toggle-cart-button" onClick={() => setShowCart(!showCart)}>Mostrar Carrito</button>
            <div className="cart-content">
                <h2>Carrito de Compras</h2>
                {renderCartItems()}
                <p>Total: ${totalPrice}</p>
                <button onClick={handleConfirmPurchase}>Confirmar Compra</button>
            </div>
        </div>
    );
};

export default ItemDetailCart;