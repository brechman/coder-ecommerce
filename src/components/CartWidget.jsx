import React from 'react';
import { Link } from 'react-router-dom';
import carrito from "../assets/cart.png";

const CartWidget = () => {

  
    return (
        <>
            <Link to="/checkout">
                <img src={carrito} alt="liquor shop" height={40} />
            </Link>     
        </>
    );
};

export default CartWidget;

