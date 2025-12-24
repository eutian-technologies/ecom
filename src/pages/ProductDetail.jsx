import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { products, addToCart } = useContext(ShopContext);
    const product = products.find((p) => p.id === Number(id));
    const [selectedSize, setSelectedSize] = useState('M');

    // Image state - initialize with null, set in useEffect or after product load
    const [activeImage, setActiveImage] = useState(null);

    // Initial load effect
    React.useEffect(() => {
        if (product) {
            setActiveImage(product.image);
            window.scrollTo(0, 0);
        }
    }, [product]);

    if (!product) {
        return <div className="container" style={{ paddingTop: '5rem' }}>Product not found</div>;
    }

    const sizes = ['S', 'M', 'L', 'XL'];

    // Generate dummy images array (Main + 3 placeholders using same image but with different view keys if needed)
    // In a real app, `product.images` would exist.
    const images = product ? [
        product.image,
        product.image, // Dummy 2
        product.image, // Dummy 3
        product.image  // Dummy 4
    ] : [];

    // Filter similar products
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="product-detail container animate-fade-in">
            <div className="detail-grid">
                <div className="detail-images-container">
                    <div className="detail-image-wrapper">
                        <img src={activeImage} alt={product.name} className="detail-image" />
                    </div>
                    <div className="detail-thumbnails">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                                onClick={() => setActiveImage(img)}
                            >
                                <img src={img} alt={`View ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="detail-info">
                    <p className="detail-category">{product.category}</p>
                    <h1 className="detail-title">{product.name}</h1>
                    <p className="detail-price">₹{product.price.toLocaleString('en-IN')}</p>

                    <p className="detail-description">{product.description}</p>

                    <div className="detail-options">
                        {!product.name.toLowerCase().includes('saree') && (
                            <div className="option-group">
                                <label>Size</label>
                                <div className="size-selector">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="detail-actions">
                        <button className="add-to-cart-btn" onClick={() => addToCart(product.id)}>
                            <ShoppingBag size={20} />
                            Add to Cart
                        </button>
                    </div>

                    <div className="detail-meta">
                        <p>Free shipping on orders over ₹1,499</p>
                        <p>30-day return policy</p>
                    </div>
                </div>
            </div>

            {/* Similar Products Section */}
            <div className="similar-products-section">
                <h2 className="section-title">Similar Products</h2>
                <div className="product-grid">
                    {relatedProducts.map(related => (
                        <ProductCard key={related.id} product={related} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
