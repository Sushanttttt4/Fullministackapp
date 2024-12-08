import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">MyApp</Link>
            {localStorage.getItem('token') ? (
                <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <>
                    <Link className="btn btn-sm btn-outline-light" to="/login">Login</Link>
                    <Link className="btn btn-sm btn-outline-light" to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
