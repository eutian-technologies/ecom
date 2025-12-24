import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, Home } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import './Navbar.css';

const Navbar = () => {
    const { getTotalCartItems, products } = useContext(ShopContext);
    const totalItems = getTotalCartItems();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length > 0) {
            // Filter products and categories for suggestions
            const filteredProducts = products.filter(p =>
                p.name.toLowerCase().includes(value.toLowerCase()) ||
                p.category.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 7); // Limit items

            // Extract unique categories that match
            const matchingCategories = [...new Set(products.map(p => p.category))]
                .filter(cat => cat.toLowerCase().includes(value.toLowerCase()));

            setSuggestions({ products: filteredProducts, categories: matchingCategories });
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (term) => {
        setSearchTerm(term);
        navigate(`/shop?search=${encodeURIComponent(term)}`);
        setShowSuggestions(false);
    };


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    const toggleMobileSearch = () => {
        setIsMobileSearchOpen(!isMobileSearchOpen);
        // Focus logic could go here
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">

                {/* Mobile Search View (Overlays logo/icons when active) */}
                {isMobileSearchOpen ? (
                    <div className="mobile-search-active-container mobile-only">
                        <button className="icon-btn" onClick={() => setIsMobileSearchOpen(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                        </button>
                        <form onSubmit={(e) => { handleSearchSubmit(e); setIsMobileSearchOpen(false); }} className="search-form mobile-search-form">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="search-input"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                                autoFocus
                            />
                            <button type="submit" className="search-submit-btn">
                                <Search size={20} />
                            </button>
                        </form>

                        {/* Mobile Suggestions */}
                        {showSuggestions && (
                            <div className="search-suggestions mobile-suggestions">
                                {/* Categories */}
                                {suggestions.categories.length > 0 && (
                                    <div className="suggestion-group">
                                        {suggestions.categories.map(cat => (
                                            <div
                                                key={cat}
                                                className="suggestion-item category-item"
                                                onClick={() => handleSuggestionClick(cat)}
                                            >
                                                <span className="search-highlight">in</span> {cat}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Products */}
                                {suggestions.products.length > 0 ? (
                                    suggestions.products.map(product => (
                                        <div
                                            key={product.id}
                                            className="suggestion-item"
                                            onClick={() => handleSuggestionClick(product.name)}
                                        >
                                            <div className="suggestion-text">
                                                {product.name}
                                                <span className="suggestion-category">in {product.category}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    suggestions.categories.length === 0 && (
                                        <div className="suggestion-item no-results">
                                            No results found
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Standard Header View */
                    <>
                        <div className="navbar-left">
                            <Link to="/" className="brand-logo" onClick={closeMenu}>
                                JBROS
                            </Link>
                        </div>

                        {/* Desktop Search Bar - Hidden on Mobile */}
                        <div className="navbar-search-container desktop-only" ref={searchRef}>
                            <form onSubmit={handleSearchSubmit} className="search-form">
                                <input
                                    type="text"
                                    placeholder="Search for products, brands and more"
                                    className="search-input"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                                />
                                <button type="submit" className="search-submit-btn">
                                    <Search size={20} />
                                </button>
                            </form>

                            {/* Suggestions (Reuse logic but ensure it's visible if needed) */}
                            {showSuggestions && (
                                <div className="search-suggestions">
                                    {/* Categories */}
                                    {suggestions.categories.length > 0 && (
                                        <div className="suggestion-group">
                                            {suggestions.categories.map(cat => (
                                                <div
                                                    key={cat}
                                                    className="suggestion-item category-item"
                                                    onClick={() => handleSuggestionClick(cat)}
                                                >
                                                    <span className="search-highlight">in</span> {cat}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Products */}
                                    {suggestions.products.length > 0 ? (
                                        suggestions.products.map(product => (
                                            <div
                                                key={product.id}
                                                className="suggestion-item"
                                                onClick={() => handleSuggestionClick(product.name)}
                                            >
                                                <div className="suggestion-text">
                                                    {product.name}
                                                    <span className="suggestion-category">in {product.category}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        suggestions.categories.length === 0 && (
                                            <div className="suggestion-item no-results">
                                                No results found
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="navbar-right">
                            {/* Mobile Search Trigger */}
                            <button className="icon-btn mobile-only" onClick={toggleMobileSearch}>
                                <Search size={22} color="var(--color-primary)" />
                            </button>

                            <div className="desktop-only text-links">
                                <Link to="/shop">Shop</Link>
                                <Link to="/about">About</Link>
                                <Link to="/contact">Contact</Link>
                            </div>

                            {/* Desktop Cart - Hidden on Mobile */}
                            <Link to="/cart" className="icon-btn cart-btn desktop-only" onClick={closeMenu}>
                                <ShoppingBag size={22} strokeWidth={1.5} />
                                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="bottom-nav mobile-only">
                <Link to="/" className="bottom-nav-item" onClick={closeMenu}>
                    <Home size={24} strokeWidth={1.5} />
                    <span>Home</span>
                </Link>
                <Link to="/shop" className="bottom-nav-item" onClick={closeMenu}>
                    <Search size={24} strokeWidth={1.5} />
                    <span>Shop</span>
                </Link>
                <Link to="/cart" className="bottom-nav-item" onClick={closeMenu}>
                    <div className="icon-wrapper">
                        <ShoppingBag size={24} strokeWidth={1.5} />
                        {totalItems > 0 && <span className="bottom-nav-badge">{totalItems}</span>}
                    </div>
                    <span>Cart</span>
                </Link>
                <button className="bottom-nav-item menu-trigger" onClick={toggleMenu}>
                    <Menu size={24} strokeWidth={1.5} />
                    <span>Menu</span>
                </button>
            </div>

            {/* Mobile Menu Overlay & Drawer */}
            <div className={`mobile-menu-overlay mobile-only ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
            <div className={`mobile-menu-drawer mobile-only ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <span className="brand-logo">JBROS</span>
                    <button className="close-menu-btn" onClick={closeMenu}>&times;</button>
                </div>
                <div className="mobile-menu-links">
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/shop" onClick={closeMenu}>Shop</Link>
                    <Link to="/about" onClick={closeMenu}>About Us</Link>
                    <Link to="/contact" onClick={closeMenu}>Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
