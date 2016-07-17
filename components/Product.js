import React from "react";
import * as prodDescKeys from "../constants/ProductDescriptionKeys";

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

function renderDosage(dosage) {
  if (typeof dosage === "undefined") {
    return null;
  }

  return Object.entries(dosage).map(([sitKey, sitValue], idx) => {
    const sitDispName = prodDescKeys.getSituationDisplayName(sitKey);
    if (sitDispName !== null) {
      const targetGroups =
        Object.entries(sitValue).map(([targetKey, targetValue], innerIdx) => {
          const targetDisplayName = prodDescKeys.getTargetGroupDisplayName(targetKey);
          if (targetDisplayName !== null) {
            return <p key={innerIdx}><em>{`${targetDisplayName}: `}</em>{targetValue}</p>;
          } else {
            return null;
          }
        });
      return (
        <div key={idx}>
          <p><strong>{sitDispName}</strong></p>
          {targetGroups}
        </div>
      );
    } else {
      return null;
    }
  });
}

function createProductDetails(prodDesc) {
  const dosageDetails = renderDosage(prodDesc.dosage);
  let dosageInfo = null;

  if (dosageDetails !== null) {
    dosageInfo = (
      <div>
        <p><strong>{"Dosage Info"}</strong></p>
        {dosageDetails}
      </div>
    )
  }

  return (
    <div>
      <dl>
        <dt>{"Advise"}</dt>
        <dd>{prodDesc.advice}</dd>
        <dt>{"Producent"}</dt>
        <dd>{prodDesc.producer}</dd>
      </dl>
      {dosageInfo}
    </div>
  );
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
        {createProductDetails(product)}
      </div>
    </div>
  );
}

Product.defaultProps = {
  onToggleSelectedProduct: null,
  showPrice: false
}

export default Product;
