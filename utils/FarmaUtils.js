import immutable from "immutable";
import * as packageTypes from "../constants/PackageTypes";
import * as prodDescKeys from "../constants/ProductDescriptionKeys";

export function extractCountry(results) {
  var countryResult = results.find(function(result) {
    return result.types.includes("country");
  })
  return countryResult.formatted_address;
}

function inferProductPackageType(packageType1, packageType2) {
  return Math.min(packageType1, packageType2);
}

function getProductPackageType(product) {
  if (product.hasOwnProperty("basic")) {
    return packageTypes.BASIC;
  } else if (product.hasOwnProperty("plus")) {
    return packageTypes.PLUS;
  } else if (product.hasOwnProperty("excellent")) {
    return packageTypes.EXCELLENT;
  }
}

function getRatioForKey(prodDescr, key) {
  if (prodDescr.hasOwnProperty(key)) {
    return prodDescr[key];
  } else {
    return 0;
  }
}

function computeQuantity(prodDesc, travellerKey, numTravellers) {
  const ratio = getRatioForKey(prodDesc, travellerKey);
  if (travellerKey === prodDescKeys.PARTY_RATIO) {
    return ratio;
  } else {
    return Math.ceil(ratio * numTravellers);
  }
}

function computeProductQuantity(prodDesc, numberAdults, numberChildren) {
  const quantityForAdults =
    computeQuantity(prodDesc, prodDescKeys.ADULT_RATIO, numberAdults);
  const quantityForChildren =
    computeQuantity(prodDesc, prodDescKeys.CHILD_RATIO, numberChildren);
  const quantityForParty =
    computeQuantity(prodDesc, prodDescKeys.PARTY_RATIO);

  return (quantityForAdults + quantityForChildren + quantityForParty);
}

function computeProductTotalPrice(currTotalPrice, prodDesc, numberAdults, numberChildren) {
  const prodQuantity = computeProductQuantity(prodDesc, numberAdults, numberChildren);
  const prodPrice = prodDesc[prodDescKeys.PRICE];
  return currTotalPrice + (prodQuantity * prodPrice);
}

const initialProductFields = {
  showDetails: false
}

function updateSelectedProducts(currProducts,
  productDescriptions,
  newProdId,
  countryProdProps,
  countryDetails) {
    const numberAdults = countryDetails.adults;
    const numberChildren = countryDetails.children;
    const existingProdDesc = currProducts.get(newProdId, null);
    const countryPackageType = getProductPackageType(countryProdProps);

    if (existingProdDesc === null) {
      const productDescr = productDescriptions[newProdId];
      const productTotalPrice =
        computeProductTotalPrice(0, productDescr, numberAdults, numberChildren);
      const updatedDesc =
        Object.assign({}, productDescr,
          initialProductFields,
          {id: newProdId},
          {packageType: countryPackageType},
          {totalPrice: productTotalPrice}
        );
      return currProducts.set(newProdId, updatedDesc);
    } else {
      const currPackageType = existingProdDesc.packageType;
      const updatedPackageType =
        inferProductPackageType(currPackageType, countryPackageType);
      const currTotalPrice = existingProdDesc.totalPrice;
      const productTotalPrice =
        computeProductTotalPrice(currTotalPrice, existingProdDesc, numberAdults, numberChildren);
      const updatedDesc =
        Object.assign({}, existingProdDesc,
          {packageType: updatedPackageType},
          {totalPrice: productTotalPrice}
        );
      return currProducts.set(newProdId, updatedDesc);
    }
  }

/**
 * Computes the product packages based on the selected countries.
 * @param {array} countries - The descriptions of the selected countries, as
 * retrieved from the database.
 * @param {array} productDescription - The product descriptions, as retrieved from
 * the database.
 * @return {object} - An immutable.Map from package keys to the products in
 * that package.
 */
export function computePackages(countries, productDescriptions) {
  const packagesByTypeInit = immutable.Map()
    .set(packageTypes.BASIC, immutable.List())
    .set(packageTypes.PLUS, immutable.List())
    .set(packageTypes.EXCELLENT, immutable.List());

  const selectedProductsInit = immutable.Map();

  const selectedProducts = countries.reduce((acc, country) => {
    const products = Object.keys(country.products);
    return products.reduce((innerAcc, prodId) => {
      return updateSelectedProducts(
        innerAcc,
        productDescriptions,
        prodId,
        country.products[prodId],
        country.details
      );
    }, acc)
  }, selectedProductsInit);

  const packagesByType = selectedProducts.reduce((acc, prod) => {
    const prodPackageType = prod.packageType;
    const currPackage = acc.get(prodPackageType);
    const updatedPackage = currPackage.push(prod);
    return acc.set(prodPackageType, updatedPackage);
  }, packagesByTypeInit);

  return packagesByType;
}

/**
 * Finds all packages that are less than or equal to a given package type.
 * For instance, if the selected package type is PLUS, then the relevant
 * packages are BASIC and PLUS.
 * @param {string} packageType - The package type.
 * @return {object} - An immutable.List of the relevant package types.
 */
export function findAllRelevantPackageTypes(packageType) {
  return (
    immutable.List(packageTypes.ALL_PACKAGE_TYPES.filter(pt =>
      pt <= packageType)
    )
  );
}

/**
 * Given a list of products in a package, returns the total price
 * of the package.
 * @param {array} products - The products in the package
 * @returns {int} - The rounded price of the package
 */
export function findPackageTotalPrice(products) {
  const rawTotal = products.reduce((acc, prod) => {
    return (acc + prod.totalPrice);
  }, 0);
  return Math.round(rawTotal);
}
