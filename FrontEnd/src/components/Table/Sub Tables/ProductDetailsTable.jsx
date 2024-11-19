import React from "react";

const ProductDetailsTable = ({ productData }) => {
  console.log("Product Data:", productData); // Debug log

  // Convert productData object into an array of key-value pairs
  const productEntries = Object.entries(productData).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <div>
      <table className="table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th scope="col">Attribute</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {productEntries.length > 0 ? (
            productEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.key || "N/A"}</td>
                <td>{entry.value || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No product data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailsTable;
