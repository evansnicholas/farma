import immutable from "immutable";
import * as packageTypes from "../constants/PackageTypes"

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

function updateSelectedProducts(currProducts,
  productDescriptions,
  newProdId,
  newProd) {
    const existingProd = currProducts.get(newProdId, null);
    const countryPackageType = getProductPackageType(newProd);
    if (existingProd === null) {
      const productDescr = productDescriptions[newProdId];
      productDescr.packageType = countryPackageType;
      return currProducts.set(newProdId, productDescr);
    } else {
      const currPackageType = existingProd.packageType;
      const updatedPackageType =
        inferProductPackageType(currPackageType, countryPackageType);
      existingProd.packageType = updatedPackageType;
      return currProducts.set(newProdId, existingProd);
    }
  }


export function computePackages(countries, productDescriptions) {
  const packagesByTypeInit = immutable.Map()
    .set(packageTypes.BASIC, immutable.List())
    .set(packageTypes.PLUS, immutable.List())
    .set(packageTypes.EXCELLENT, immutable.List());

  const selectedProductsInit = immutable.Map();

  const selectedProducts = countries.reduce((acc, country) => {
    const products = Object.keys(country.products);
    return products.reduce((innerAcc, prodId) => {
      return updateSelectedProducts(innerAcc,
        productDescriptions, prodId, country.products[prodId]);
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

export function findAllRelevantPackageTypes(packageType) {
  return (
    immutable.List(packageTypes.ALL_PACKAGE_TYPES.filter(pt =>
      pt <= packageType)
    )
  );
}
