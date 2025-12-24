import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const { products } = useContext(ShopContext);
    // Get first 4 products for trending
    const trendingProducts = products.slice(0, 4);

    return (
        <div className="home-page animate-fade-in">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content container">
                    <h1 className="hero-title">
                        Elevate Your <br />
                        <span className="text-italic">Everyday Style.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Premium essentials crafted for the modern individual.
                        Timeless designs, exceptional quality.
                    </p>
                    <Link to="/shop" className="btn-primary">
                        Shop Collection <ArrowRight size={18} />
                    </Link>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop" alt="Hero Fashion" />
                </div>
            </section>

            {/* Marquee / Features */}
            <div className="features-banner">
                <div className="container">
                    <span>Premium Materials</span>
                    <span className="separator">•</span>
                    <span>Ethical Manufacturing</span>
                    <span className="separator">•</span>
                    <span>Free Worldwide Shipping</span>
                </div>
            </div>

            {/* Trending Section */}
            <section className="trending container section-padding">
                <div className="section-header">
                    <h2 className="section-title">Trending Now</h2>
                    <Link to="/shop" className="link-underline">View all products</Link>
                </div>
                <div className="product-grid">
                    {trendingProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section container">
                <div className="newsletter-box">
                    <h2>Join the Club</h2>
                    <p>Get 15% off your first order when you sign up for our newsletter.</p>
                    <form className="newsletter-form-home" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
