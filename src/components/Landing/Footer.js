import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <section className="footer-wrapper">
                <article>
                    <h2>Company</h2>
                    <p>About us</p>
                    <p>Contact us</p>
                    <p>Careers</p>
                    <p>Press</p>
                </article>
                <article>
                    <h2>Product</h2>
                    <p>Features</p>
                    <p>Pricing</p>
                    <p>News</p>
                    <p>Help desk</p>
                    <p>Support</p>
                </article>
                <article>
                    <h2>Services</h2>
                    <p>Copy Trading</p>
                    <p>Trading Signals</p>
                    <p>Risk</p>
                    <p>Management</p>
                </article>
                <article>
                    <h2>Legal</h2>
                    <p>Privacy Policy</p>
                    <p>Terms &</p>
                    <p>Conditions</p>
                </article>
                <article>
                    <h2>Contact Us</h2>
                    <p>support@universalfx.site</p>
                </article>
            </section>
            <section className="social">
                <hr />
                <div className="social-media-wrapper">
                    <p>© 2024 Copyright, All Right Reserved, Universal FX</p>
                    <div className="social-media">
                        <img src="/images/Social.svg" alt="social" />
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer