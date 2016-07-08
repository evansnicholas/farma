import React from "react";

const Product = ({
  product,
  onToggleProductVisibility
}) => {

  const prodDetailsClass = (product.showDetails) ? "show" : "hidden";

  return (
    <div className="product" onClick={() => onToggleProductVisibility(product.id)}>
      <p>{product.name}</p>
      <div className={prodDetailsClass}>
        <p><strong>{"Description:"}</strong>{"This is a product description"}</p>
      </div>
    </div>
  );
}

export default Product;
