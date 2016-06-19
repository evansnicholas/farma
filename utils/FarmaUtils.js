export function extractCountry(results) {
  var countryResult = results.find(function(result) {
    return result.types.includes("country");
  })
  return countryResult.formatted_address;
}
