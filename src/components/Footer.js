import React from 'react';
import './Footer.css'; // 스타일 추가

function Footer() {
  return (
    <footer className="footer">
      <h3>Liquidity Services Brands</h3>
      <div className="brands-container">
        <a href="https://www.allsurplus.com/?_gl=1*15pzhno*_gcl_au*MTAxNTM0NTM2OC4xNzM4MjExMzk4&_ga=2.51874025.1164362237.1739787209-837991259.1738211398" target="_blank" rel="noopener noreferrer" className="brand">
          <img src="/images/allsurplus.png" alt="AllSurplus" />
          <p>Surplus Aggregator</p>
        </a>
        <a href="https://www.liquidation.com/?_ga=2.51874025.1164362237.1739787209-837991259.1738211398" target="_blank" rel="noopener noreferrer" className="brand">
          <img src="/images/liquidation.png" alt="Liquidation.com" />
          <p>Retail Surplus</p>
        </a>
        <a href="https://www.bid4assets.com/" target="_blank" rel="noopener noreferrer" className="brand">
          <img src="/images/bid4assets.png" alt="Bid4Assets" />
          <p>Property Surplus</p>
        </a>
        <a href="https://www.machinio.com/" target="_blank" rel="noopener noreferrer" className="brand">
          <img src="/images/machinio.png" alt="Machinio" />
          <p>Machinery Surplus</p>
        </a>
        <a href="https://www.govdeals.com" target="_blank" rel="noopener noreferrer" className="brand">
          <img src="/images/govdeals.png" alt="GovDeals" />
          <p>Government Surplus</p>
        </a>
        <a href="https://secondipity.com/?_ga=2.4575219.1164362237.1739787209-837991259.1738211398" target="_blank" rel="noopener noreferrer" className="brand">
          <img src="/images/secondipity.png" alt="Secondipity" />
          <p>Consumer Surplus</p>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
