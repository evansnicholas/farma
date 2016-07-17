export const BASIC = 0;
export const BASIC_DISPLAY_NAME = "Basic";
export const PLUS = 1;
export const PLUS_DISPLAY_NAME = "Plus";
export const EXCELLENT = 2;
export const EXCELLENT_DISPLAY_NAME = "Excellent";
export const ALL_PACKAGE_TYPES = [BASIC, PLUS, EXCELLENT];

export function getPackageDisplayName(packageType) {
  switch(packageType) {
    case BASIC:
      return BASIC_DISPLAY_NAME;
    case PLUS:
      return PLUS_DISPLAY_NAME;
    case EXCELLENT:
      return EXCELLENT_DISPLAY_NAME;
    default:
      return null;
  }
}
