import immutable from "immutable";
import * as packageTypes from "../constants/PackageTypes";
import * as prodDescKeys from "../constants/ProductDescriptionKeys";

export function extractCountry(results) {
  var countryResult = results.find(function(result) {
    return result.types.includes("country");
  })
  return countryResult.formatted_address;
}

function isExtra(product) {
  return product.hasOwnProperty(prodDescKeys.EXTRA);
}

function inferProductPackageType(packageType1, packageType2) {
  return Math.min(packageType1, packageType2);
}

function getProductPackageType(product) {
  if (product.hasOwnProperty(prodDescKeys.BASIC)) {
    return packageTypes.BASIC;
  } else if (product.hasOwnProperty(prodDescKeys.PLUS)) {
    return packageTypes.PLUS;
  } else if (product.hasOwnProperty(prodDescKeys.EXCELLENT)) {
    return packageTypes.EXCELLENT;
  } else {
    return null;
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

function updateSelectedProducts(currProducts,
  productDescriptions,
  newProdId,
  countryProdProps,
  countryDetails) {
    const numberAdults = countryDetails.adults;
    const numberChildren = countryDetails.children;
    const existingProdDesc = currProducts.get(newProdId, null);
    const countryPackageType = getProductPackageType(countryProdProps);

    // Ignore all the products for which we can't determine the package type.
    if (countryPackageType === null) {
      return currProducts;
    }

    if (existingProdDesc === null) {
      const productDescr = productDescriptions[newProdId];
      const productTotalPrice =
        computeProductTotalPrice(0, productDescr, numberAdults, numberChildren);
      const updatedDesc =
        Object.assign({}, productDescr,
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
 * Computes the extra products that will be offered to the client.
 */
export function computeExtras(countries, productDescriptions) {
  const extras = countries.reduce((acc, country) => {
    const products = Object.keys(country.products);
    return products.reduce((innerAcc, prodId) => {
      const existingProd = innerAcc.get(prodId, null);
      if (existingProd !== null) {
        return innerAcc;
      } else {
        if (isExtra(country.products[prodId])) {
          const rawProdDesc = productDescriptions[prodId];
          const prodDesc =
            Object.assign(
              rawProdDesc,
              {id: prodId},
              {totalPrice: rawProdDesc.price}
            );
          return innerAcc.set(prodId, prodDesc);
        } else {
          return innerAcc;
        }
      }
    }, acc)
  }, immutable.Map());

  return extras;
}

/**
 * Given a packageType and the computed packages finds all the products
 * in a given package (this is a union of the products in the package itself
 * and in all the lesser packages).
 * @param {int} packageType - The package type.
 * @param {object} packages - The package definitions.
 * @return {array} - All the products in the package.
 */
export function findAllProductsInPackage(packageType, packages) {
  const relevantPackageTypes =
    findAllRelevantPackageTypes(packageType);
  const products = relevantPackageTypes.map(pt => {
    return packages.get(pt);
  }).flatten();

  return products;
}

/**
 * Finds all packages that are less than or equal to a given package type.
 * For instance, if the selected package type is PLUS, then the relevant
 * packages are BASIC and PLUS.
 * @param {int} packageType - The package type.
 * @return {object} - An immutable.List of the relevant package types.
 */
export function findAllRelevantPackageTypes(packageType) {
  return (
    immutable.List(packageTypes.ALL_PACKAGE_TYPES.filter(pt =>
      pt <= packageType)
    )
  );
}

export function findAllExtraProductDescriptions(
  selectedExtras,
  productDescriptions) {
  return selectedExtras.valueSeq().map(extra =>
    productDescriptions.get(extra)
  );
}

/**
 * Given a list of products, returns the total price
 * of all the products.
 * @param {array} products - The products in the package
 * @returns {int} - The rounded price of the package
 */
export function findTotalProductsPrice(products) {
  const rawTotal = products.reduce((acc, prod) => {
    return (acc + prod.totalPrice);
  }, 0);
  return Math.round(rawTotal);
}
