import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cartItems, products, removeFromCart, addToCart, updateCartItemCount, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const handleCheckout = () => {
        const phoneNumber = "918125685107"; // Updated WhatsApp number
        let message = "Hello Jbros, I'd like to place an order:%0A%0A";

        products.forEach((product) => {
            if (cartItems[product.id] > 0) {
                message += `- ${product.name} (x${cartItems[product.id]}) - ₹${(product.price * cartItems[product.id]).toLocaleString('en-IN')}%0A`;
            }
        });

        message += `%0A*Total Amount: ₹${totalAmount.toLocaleString('en-IN')}*`;
        message += "%0A%0APlease confirm my order.";

        window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
    };

    if (totalAmount === 0) {
        return (
            <div className="cart-page container empty-cart">
                <h2>Your Bag is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="btn-primary" style={{ marginTop: '2rem' }}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container animate-fade-in">
            <h1 className="cart-title">Your Bag</h1>

            <div className="cart-grid">
                <div className="cart-items">
                    {products.map((product) => {
                        if (cartItems[product.id] !== 0) {
                            return (
                                <div className="cart-item" key={product.id}>
                                    <img src={product.image} alt={product.name} />
                                    <div className="cart-item-info">
                                        <Link to={`/product/${product.id}`} className="cart-item-name">{product.name}</Link>
                                        <p className="cart-item-price">₹{product.price.toLocaleString('en-IN')}</p>
                                        <div className="quantity-controls">
                                            <button onClick={() => removeFromCart(product.id)}><Minus size={16} /></button>
                                            <input
                                                value={cartItems[product.id]}
                                                onChange={(e) => updateCartItemCount(Number(e.target.value), product.id)}
                                            />
                                            <button onClick={() => addToCart(product.id)}><Plus size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="cart-item-total">
                                        ₹{(product.price * cartItems[product.id]).toLocaleString('en-IN')}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <button className="checkout-btn" onClick={handleCheckout}>
                        Checkout via WhatsApp <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Cart;
