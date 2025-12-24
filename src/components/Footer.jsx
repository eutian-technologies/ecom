import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">

                {/* Top Grid: 4 Columns */}
                <div className="footer-top">
                    <div className="footer-col brand-col">
                        <h2 className="footer-logo">JBROS</h2>
                        <p className="footer-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Navigation</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Quick Link</h4>
                        <ul className="footer-links">
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="#">FAQs</Link></li>
                            <li><Link to="#">Booking</Link></li>
                            {/* <li><Link to="#">Pages</Link></li> */}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            {/* <li><Link to="/contact">Contact</Link></li> */}
                            {/* <li><Link to="#">Blog</Link></li> */}
                            <li><Link to="#">404</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="footer-contact-bar">
                    <div className="contact-item">
                        <div className="contact-icon">
                            <MapPin size={20} fill="currentColor" strokeWidth={0} />
                        </div>
                        <span>Pragati Plaza, No 160/2A, Hosur Highway, Kammasandra, Hebbagodi, Bengaluru, Karnataka 560100</span>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <Phone size={20} fill="currentColor" strokeWidth={0} />
                        </div>
                        <span>8125685107</span>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <Mail size={20} fill="currentColor" strokeWidth={0} />
                        </div>
                        <span>contact@jbros.com</span>
                    </div>

                    <div className="footer-socials">
                        <a href="#" className="social-icon"><Facebook size={20} /></a>
                        <a href="#" className="social-icon"><Twitter size={20} /></a>
                        <a href="#" className="social-icon"><Youtube size={20} /></a>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Jbros Template • All Rights Reserved</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
