import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page container animate-fade-in">
            <div className="about-header">
                <h1>Our Story</h1>
            </div>
            <div className="about-content">
                <div className="about-text">
                    <p>
                        Founded with a vision to redefine modern essentials, Jbros is more than just a clothing store. It's a celebration of timeless style, exceptional quality, and the art of dressing well.
                    </p>
                    <p>
                        We believe that true style shouldn't be complicated. That's why we focus on creating pieces that are versatile, durable, and effortlessly elegant. From our carefully sourced fabrics to our meticulous attention to detail, every item in our collection is designed to be a wardrobe staple for years to come.
                    </p>
                    <p>
                        Thank you for being part of our journey.
                    </p>
                </div>
                <div className="about-image">
                    <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800" alt="Tailors working" />
                </div>
            </div>
        </div>
    );
};

export default About;
