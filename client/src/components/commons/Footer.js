import React from 'react';

// Footer text Style CSS..
const footerText = {
    color: 'gray',
};

// Get the current Year from here..
const getCurrentYear = new Date().getFullYear();

// Footer component..
const Footer = () => {
    return (
        <footer>
            <p style={footerText}>
                &copy; {getCurrentYear} - SocialMeta from Asad Anik. <br/> And fullstack project of React Node.
            </p>
        </footer>
    );
}

export default Footer;
