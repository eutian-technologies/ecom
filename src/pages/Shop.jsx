import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const Shop = () => {
    const { products } = useContext(ShopContext);
    const [searchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState('All');

    // Get search term from URL
    const searchTerm = searchParams.get('search') || '';

    // Filter products based on active category AND search term
    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = searchTerm === '' ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const categories = ['All', 'Shirts', 'Pants', 'Shoes', 'Jackets', 'Women'];

    // Reset category if searching from global search bar
    useEffect(() => {
        if (searchTerm) {
            setActiveCategory('All');
        }
    }, [searchTerm]);

    return (
        <div className="shop-page container animate-fade-in">
            <header className="shop-header">
                <h1 className="shop-title">
                    {searchTerm ? `Results for "${searchTerm}"` : 'All Products'}
                </h1>
                <p className="shop-subtitle">Found {filteredProducts.length} items</p>
            </header>

            <div className="shop-controls">
                {categories.map(category => (
                    <div
                        key={category}
                        className={`filter-pill ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => {
                            setActiveCategory(category);
                            // Optional: clear search when clicking distinct category filter? 
                            // adhering to simple logic: keeps search term AND filter.
                        }}
                    >
                        {category}
                    </div>
                ))}
            </div>

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: '#888' }}>
                        <p>No products found matching your criteria.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                            <button
                                className="btn-primary"
                                style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}
                                onClick={() => {
                                    setActiveCategory('All');
                                    window.history.pushState({}, '', '/shop'); // Clear URL params
                                    window.location.reload();
                                }}
                            >
                                Clear Filters
                            </button>

                            <button
                                className="btn-primary"
                                style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', backgroundColor: '#25D366', borderColor: '#25D366' }}
                                onClick={() => {
                                    const message = `Hi Jbros, I'm looking for "${searchTerm}" but couldn't find it on your store. Can you help?`;
                                    window.open(`https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)}`, '_blank');
                                }}
                            >
                                Request Product
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
