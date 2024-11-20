import React from 'react';
import '../Styles/Footer.css';  

function Footer() {
  return (
    
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-address">
          <p>255/15 Wall Street, NY, 10005, USA</p>
        </div>
        
        <div className="footer-icons">
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook-f"></i> 
  </a>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram"></i> 
  </a>
</div>

        
        <div className="footer-copyright">
          <p>&copy; 2024 Vauecorp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
