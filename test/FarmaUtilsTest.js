import {expect} from "chai";
import {computePackages} from "../utils/FarmaUtils";
import * as packageTypes from "../constants/PackageTypes";

describe('FarmaUtils', function() {
  describe('#computePackages', function () {
    it('should compute the correct packages', function () {
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
            }
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
            }
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
            }
          }
        }
      ];

      const productDescriptions = {
        "1000": {
          "name": "Product 1000"
        },
        "1001": {
          "name": "Product 1001"
        },
        "1002": {
          "name": "Product 1002"
        },
        "1003": {
          "name": "Product 1003"
        },
        "2000": {
          "name": "Product 2000"
        },
        "2001": {
          "name": "Product 2001"
        },
        "3000": {
          "name": "Product 3000"
        },
        "3001": {
          "name": "Product 3001"
        }
      };

      const packages = computePackages(countries, productDescriptions);
      expect(packages.get(packageTypes.BASIC).size).to.equal(4);
      expect(packages.get(packageTypes.PLUS).size).to.equal(2);
      expect(packages.get(packageTypes.EXCELLENT).size).to.equal(2);
    });
  });
});
