import React, { useContext } from 'react';
import { CartContext } from '../components/cartContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart() {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useContext(CartContext);

    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4 mb-5 bg-white rounded">
                <h1 className="text-center mb-4">Корзина</h1>
                {cartItems.length === 0 ? (
                    <div className="alert alert-warning text-center">
                        Корзина пуста
                    </div>
                ) : (
                    <div className="list-group">
                        {cartItems.map((item) => (
                            <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" key={item.id}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{item.name}</h5>
                                    <small className="text-muted">{item.price} руб.</small>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn btn-outline-secondary btn-sm me-2"
                                            onClick={() => decreaseQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <span className="mb-1 mx-2">{item.quantity}</span>
                                        <button
                                            className="btn btn-outline-secondary btn-sm ms-2"
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="btn btn-outline-danger btn-sm mt-2"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="d-flex justify-content-end mt-4">
                    <h3 className="text-secondary">
                        Общая стоимость: <span className="text-dark">{total.toFixed(2)} руб.</span>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Cart;