import React from "react";
import "./TopProducts.css";

const topProducts = [
  {
    id: 1,
    name: "6 Decommissioned Buses - 2006-2008 MCI D4500",
    price: "$1,225.00 USD",
    location: "North Bergen, New Jersey, USA",
    image: "/images/Image 9.jpg",
    auctionInfo: "14 D 22 H (Mar 05, 2025 02:00 PM PST)",
    lotNumber: "LOT #: 6644-376",
  },
  {
    id: 2,
    name: "2018 JEEP Wrangler Unlimited V6 4D SUV Sport S",
    price: "$17,900.00 USD",
    location: "Davie, Florida, USA",
    image: "/images/Image 10.jpg",
    auctionInfo: "19 D 15 H (Mar 01, 2025 11:26 AM PST)",
    lotNumber: "LOT #: 25370-596",
  },
  {
    id: 3,
    name: "2014 Nissan GT-R",
    price: "$59,750.00 USD",
    location: "Jacksonville, Florida, USA",
    image: "/images/Image 11.jpg",
    auctionInfo: "2 D 3 H (Mar 02, 2025 07:39 PM PST)",
    lotNumber: "LOT #: 26960-698",
  },
];

function TopProducts() {
  return (
    <div className="top-products-section">
      <h2 className="top-products-title">Top Products in Transportation</h2>
      <div className="top-products-container">
        <button className="arrow-button left-arrow">{"<"}</button>
        {topProducts.map((product) => (
          <div key={product.id} className="top-product-box">
            <img
              src={product.image}
              alt={product.name}
              className="top-product-image"
            />
            <h3>{product.name}</h3>
            <p className="top-product-price">{product.price}</p>
            <p className="top-product-location">{product.location}</p>
            <p className="auction-info">{product.auctionInfo}</p>
            <p className="auction-info">{product.lotNumber}</p>
          </div>
        ))}
        <button className="arrow-button right-arrow">{">"}</button>
      </div>
    </div>
  );
}

export default TopProducts;
