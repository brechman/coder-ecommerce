import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import Swal from 'sweetalert2';

const calculateTotal = (cart) => {
    const total = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    return parseFloat(total.toFixed(2));
};

const CheckoutPage = () => {

    const { cart,clearCart   } = useContext(CartContext);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'creditCard',
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async  (e) => {
        e.preventDefault();
               const orderData = {
                fullName: formData.fullName,
                email: formData.email,
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
                paymentMethod: formData.paymentMethod,
                cartItems: cart.map(item => ({
                    id: item.id,
                    name: item.description,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: calculateTotal(cart)
            };
            const errors = {};
            if (formData.fullName.trim() === '') {
                errors.fullName = 'Por favor ingrese su nombre completo.';
            }
            if (!/\S+@\S+\.\S+/.test(formData.email)) {
                errors.email = 'Por favor ingrese un correo electrónico válido.';
            }
            if (formData.address.trim() === '') {
                errors.address = 'Por favor ingrese una dirección de envío.';
            }
            if (formData.city.trim() === '') {
                errors.city = 'Por favor ingrese una ciudad.';
            }
            if (formData.postalCode.trim() === '') {
                errors.postalCode = 'Por favor ingrese un código postal.';
            }
                if (Object.keys(errors).length === 0) {
                try {
                    const db = getFirestore();
                    const orderRef = await addDoc(collection(db, 'orders'), orderData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Pedido enviado correctamente',
                        text: '¡Gracias por tu compra!',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Redirigir al link raíz
                            window.location.href = '/';
                        }
                    });
                    setFormData({
                        fullName: '',
                        email: '',
                        address: '',
                        city: '',
                        postalCode: '',
                        paymentMethod: 'creditCard',
                    });
                    // Limpiar el carrito
                    clearCart();
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al enviar pedido',
                            text: 'Ha ocurrido un error al enviar tu pedido. Por favor, inténtalo de nuevo más tarde.',
                            confirmButtonText: 'Aceptar'
                        });
                    }
            } else {
                    setFormErrors(errors);
            }
        };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Nombre Completo:</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    {formErrors.fullName && <p className="error-message">{formErrors.fullName}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="address">Dirección de Envío:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                    {formErrors.address && <p className="error-message">{formErrors.address}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="city">Ciudad:</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                    {formErrors.city && <p className="error-message">{formErrors.city}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="postalCode">Código Postal:</label>
                    <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                    {formErrors.postalCode && <p className="error-message">{formErrors.postalCode}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="paymentMethod">Método de Pago:</label>
                    <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                        <option value="creditCard">Tarjeta de Crédito</option>
                        <option value="debitCard">Tarjeta de Débito</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>

                <h2>Productos en el carrito:</h2>
                <div className="cart-items-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Stock</th>
                                <th>Cant</th>
                                <th>P. Uni</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td>{item.description}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.quantity}</td>
                                    <td>S/.{item.price.toFixed(2)}</td>
                                    <td>S/.{(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total acumulado: S/. {calculateTotal(cart)}</p>
                </div>
                <button type="submit" className="btn-confirmar">Confirmar Pedido</button>
            </form>
        </div>
    );
};

export { CheckoutPage };