import React from 'react';
import '../Styles/HomeScreen.css';

function Homecomp1() {
    return (
    
        <div className="background home-container">
            <div className='home-container-desc'>
                <h1 className='heading'>Simple and Safe Banking</h1>
                <p>
                    Welcome to Vauecorp, where simplicity meets security! Manage your finances effortlessly with our 
                    user-friendly interface and robust protection. From quick transfers to secure payments, we offer a seamless 
                    banking experience. Trusted by millions, our app ensures your money is safe, and your transactions are hassle-free. 
                    Experience banking like never before—simple, secure, and reliable.
                </p>
            </div>
                <div className="cards-container">
                    <div className="card">
                        <h3>Banking Security</h3>
                        <p>We prioritize your security with the latest encryption and security protocols to protect your data.</p>
                    </div>
                    <div className="card">
                        <h3>User Friendly</h3>
                        <p>Our User friendly interface makes our UI simple and easier for anyone to access</p>
                    </div>
                    <div className="card">
                        <h3>Trustworthiness</h3>
                        <p>We have a proven track record of customer satisfaction and reliability for all your banking needs.</p>
                    </div>
                </div>
            </div>
        
    );
}

export default Homecomp1;
