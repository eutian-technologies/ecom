import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page-wrapper">
            {/* Header Banner */}
            <div className="contact-banner">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                </div>
            </div>

            <div className="container contact-content-section">
                <div className="contact-grid-layout">
                    {/* Left Side: Info */}
                    <div className="contact-info-side">
                        <h2 className="info-title">Get In Touch</h2>
                        <p className="info-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>

                        <div className="info-cards-grid">
                            <div className="info-card">
                                <div className="info-icon-box">
                                    <Phone size={20} />
                                </div>
                                <div className="info-details">
                                    <h3>Phone</h3>
                                    <p>(+081) 5678 1234</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon-box">
                                    <Mail size={20} />
                                </div>
                                <div className="info-details">
                                    <h3>Email</h3>
                                    <p>mail@jbros.com</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon-box">
                                    <MapPin size={20} />
                                </div>
                                <div className="info-details">
                                    <h3>Address</h3>
                                    <p>London Eye, London</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon-box">
                                    <Instagram size={20} />
                                </div>
                                <div className="info-details">
                                    <h3>Instagram</h3>
                                    <p>jbros.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-media-section">
                            <h3>Social Media</h3>
                            <div className="social-icons-row">
                                <a href="#" className="sm-icon"><Facebook size={18} /></a>
                                <a href="#" className="sm-icon"><Twitter size={18} /></a>
                                <a href="#" className="sm-icon"><Youtube size={18} /></a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="contact-form-side">
                        <form className="styled-contact-form" onSubmit={(e) => {
                            e.preventDefault();
                            alert("Message sent!");
                        }}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Email" required />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Name" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input type="tel" placeholder="Phone" />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="6" placeholder="Message" required></textarea>
                            </div>

                            <button type="submit" className="contact-submit-btn">SUBMIT BUTTON</button>
                        </form>
                    </div>
                </div>

                {/* Google Map */}
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.546467367302!2d-0.12169668406734791!3d51.50332401882356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2suk!4v1652885942472!5m2!1sen!2suk"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
