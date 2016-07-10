import React from "react";

const Product = ({
  product,
  onToggleProductVisibility
}) => {

  const prodDetailsClass = (product.showDetails) ? "show" : "hidden";
  const triangleDirection = (prodDetailsClass === "show") ? "left" : "bottom";

  return (
    <div className="product">
      <div className={`product-name product-details-${prodDetailsClass}`} onClick={() => onToggleProductVisibility(product.id)}>
        <span className={`pull-right glyphicon glyphicon-triangle-${triangleDirection}`} aria-hidden="true"></span>
        <p>{product.name}</p>
      </div>
      <div className={`product-details ${prodDetailsClass}`}>
        <p><strong>{"Description: "}</strong>{"This is a product description"}</p>
      </div>
    </div>
  );
}

export default Product;
