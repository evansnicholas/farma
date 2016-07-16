import {expect} from "chai";
import {computePackages, computeExtras} from "../utils/FarmaUtils";
import * as packageTypes from "../constants/PackageTypes";

describe('FarmaUtils', function() {
  const countries = [
    {
      products: {
        "1000": {
          "basic": true
        },
        "1001": {
          "basic": true
        },
        "2000": {
          "plus": true
        },
        "3000": {
          "excellent": true
        },
        "9000": {
          "extra": true
        }
      },
      details: {
        adults: 1,
        children: 0,
        period: 1
      }
    },
    {
      products: {
        "1000": {
          "basic": true
        },
        "1001": {
          "basic": true
        },
        "2000": {
          "plus": true
        },
        "3000": {
          "excellent": true
        },
        "9000": {
          "extra": true
        }
      },
      details: {
        adults: 2,
        children: 0,
        period: 1
      }
    },
    {
      products: {
        "1002": {
          "basic": true
        },
        "1003": {
          "basic": true
        },
        "2001": {
          "plus": true
        },
        "3001": {
          "excellent": true
        },
        "9000": {
          "extra": true
        },
        "9001": {
          "extra": true
        }
      },
      details: {
        adults: 1,
        children: 0,
        period: 1
      }
    }
  ];

  const productDescriptions = {
    "1000": {
      "name": "Product 1000",
      "price": 1,
      "perAdult": 1
    },
    "1001": {
      "name": "Product 1001",
      "price": 1,
      "perAdult": 1
    },
    "1002": {
      "name": "Product 1002",
      "price": 1,
      "perAdult": 1
    },
    "1003": {
      "name": "Product 1003",
      "price": 1,
      "perAdult": 1
    },
    "2000": {
      "name": "Product 2000",
      "price": 2,
      "perAdult": 0.5
    },
    "2001": {
      "name": "Product 2001",
      "price": 2,
      "perAdult": 0.5
    },
    "3000": {
      "name": "Product 3000",
      "price": 3,
      "perAdult": 0.25
    },
    "3001": {
      "name": "Product 3001",
      "price": 3,
      "perAdult": 0.25
    },
    "9000": {
      "name": "Product 9000",
      "price": 3
    },
    "9001": {
      "name": "Product 9001",
      "price": 6
    }
  };

  describe("#computePackages", function () {
    it("should compute the correct packages", function () {
      const packages = computePackages(countries, productDescriptions);
      expect(packages.get(packageTypes.BASIC).size).to.equal(4);
      expect(packages.get(packageTypes.PLUS).size).to.equal(2);
      expect(packages.get(packageTypes.EXCELLENT).size).to.equal(2);

      const product1000 = packages.get(packageTypes.BASIC)
        .find(p => p.name === "Product 1000");
      expect(product1000.totalPrice).to.equal(3);

      const product3000 = packages.get(packageTypes.EXCELLENT)
        .find(p => p.name === "Product 3000");
      expect(product3000.totalPrice).to.equal(6);

      const product3001 = packages.get(packageTypes.EXCELLENT)
        .find(p => p.name === "Product 3001");
      expect(product3001.totalPrice).to.equal(3);

    });
  });

  describe("#computeExtras", function() {
    it("should compute the correct extras", function () {
      const extras = computeExtras(countries, productDescriptions);
      expect(extras.size).to.equal(2);
    });
  });
});
