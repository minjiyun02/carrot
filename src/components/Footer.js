import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-top">
          <div className="footer-section">
            <h4>Get to Know Us</h4>
            <a href="https://liquidityservices.com/careers/">Careers</a>
            <a href="https://www.govdeals.com/content/about-us">About GovDeals</a>
            <a href="https://liquidityservices.com/company/">About Liquidity Services</a>
            <a href="https://liquidityservices.com/company/news-press/">In The News</a>
            <a href="https://blog.govdeals.com/">Blog</a>
          </div>

          <div className="footer-section">
            <h4>Liquidity Services Brands</h4>
            <div className="brand-icons">
              <a href="https://www.allsurplus.com/"><img src="/images/allsurplus.png" alt="AllSurplus" /></a>
              <a href="https://www.liquidation.com/"><img src="/images/liquidation.png" alt="Liquidation.com" /></a>
              <a href="https://www.bid4assets.com/"><img src="/images/bid4assets.png" alt="Bid4Assets" /></a>
              <a href="https://www.machinio.com/"><img src="/images/machinio.png" alt="Machinio" /></a>
              <a href="https://www.govdeals.com/"><img src="/images/govdeals.png" alt="GovDeals" /></a>
              <a href="https://secondipity.com/"><img src="/images/secondipity.png" alt="Secondipity" /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Sell with Us</h4>
            <a href="https://www.govdeals.com/how-to-sell">How To Sell</a>
            <a href="https://www.govdeals.com/become-a-seller">Become A Seller</a>
          </div>
        </div>

        <div className="footer-bottom-section">
          <div className="footer-section">
            <h4>Buy from Us</h4>
            <a href="https://www.govdeals.com/content/how-to-buy">How To Buy</a>
            <a href="https://www.govdeals.com/why-buy">Why Buy</a>
            <a href="https://www.govdeals.com/seller-marketplaces">Seller Marketplaces</a>
          </div>

          <div className="footer-section">
            <h4>Need Help?</h4>
            <a href="https://www.govdeals.com/advanced-search">Advanced Search</a>
            <a href="https://www.govdeals.com/contact-us">Contact Us</a>
            <a href="https://www.govdeals.com/assets/pdf/GovDeals_VPAT.pdf">VPAT (PDF)</a>
            <a href="https://www.govdeals.com/faq">FAQ</a>
          </div>

          <div className="footer-section">
            <h4>Subscribe</h4>
            <a href="https://www.govdeals.com/login">Manage Preferences</a>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="footer-icons">
              <a href="https://www.facebook.com/govdeals"><img src="/images/facebook.png" alt="Facebook" /></a>
              <a href="https://www.linkedin.com/company/govdeals-inc-/"><img src="/images/linkedin.png" alt="LinkedIn" /></a>
              <a href="https://x.com/Govdeals"><img src="/images/x.png" alt="X (Twitter)" /></a>
              <a href="https://www.youtube.com/user/govdealsinc"><img src="/images/youtube.png" alt="YouTube" /></a>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <a href="https://www.govdeals.com/sitemap">Site Map</a>
        <a href="https://liquidityservices.com/privacy-policy/">Privacy Policy</a>
        <a href="https://www.govdeals.com/content/site-terms">User Agreement</a>
        <a href="https://liquidityservices.com/privacy-policy/">Manage Cookies</a>
        <button className="language-button">English 🌐</button>
      </div>

      <p className="footer-copyright">© 2025 GovDeals, Inc. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
