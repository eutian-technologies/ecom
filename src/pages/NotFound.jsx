import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page container">
            <div className="not-found-content">
                <h1 className="error-code">404</h1>
                <h2 className="error-title">Page Not Found</h2>
                <p className="error-message">
                    Oops! The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <Link to="/" className="btn-primary">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
