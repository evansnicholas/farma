import React from "react";

function createSelectButton(toggleSelectedProduct, prodId, isSelected) {
  if (toggleSelectedProduct !== null) {
    const buttonText = (isSelected) ? "Remove" : "Add";
    return (
      <button className={`btn btn-default btn-sm pull-right`}
        type="submit"
        onClick={(event) => {
          event.stopPropagation();
          toggleSelectedProduct(prodId)
        }}>{buttonText}</button>
      );
   } else {
     return null;
   }
}

function createPriceParagraph(price, showPrice) {
  if (showPrice) {
    return <p className="pull-right">{`\u20ac ${price}`}</p>;
  } else {
    return null;
  }
}

const Product = ({
  product,
  showProductDetails,
  showPrice,
  onToggleProductVisibility,
  onToggleSelectedProduct,
  isSelected
}) => {

  const prodDetailsClass = (showProductDetails) ? "show" : "hidden";
  const triangleDirection = (showProductDetails) ? "left" : "bottom";
  const selectProductButton = createSelectButton(onToggleSelectedProduct, product.id, isSelected);
  const selectedClass = (isSelected) ? "bg-success" : "product-not-selected";
  const priceP = createPriceParagraph(product.price, showPrice);

  return (
    <div className="product">
      <div className={`product-name product-details-${prodDetailsClass} ${selectedClass}`}
        onClick={() => onToggleProductVisibility(product.id)}>
        <span className={`pull-right glyphicon glyphicon-triangle-${triangleDirection}`} aria-hidden="true"></span>
        {selectProductButton}
        {priceP}
        <p>{product.name}</p>
      </div>
      <div className={`product-details ${prodDetailsClass}`}>
        <p><strong>{"Description: "}</strong>{"This is a product description"}</p>
      </div>
    </div>
  );
}

Product.defaultProps = {
  onToggleSelectedProduct: null,
  showPrice: false
}

export default Product;
