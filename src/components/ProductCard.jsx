import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-img-wrapper">
                <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
                <button
                    className="add-to-cart-quick"
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.id);
                    }}
                >
                    <Plus size={20} />
                </button>
            </Link>
            <div className="product-info">
                <p className="product-category">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
        </div>
    );
};

export default ProductCard;
