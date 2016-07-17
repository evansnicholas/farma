export const ADULT_RATIO = "perAdult";
export const CHILD_RATIO = "perChild";
export const PARTY_RATIO = "perParty";
export const PRICE = "price";
export const EXTRA = "extra";
export const BASIC = "basic";
export const PLUS = "plus";
export const EXCELLENT = "excellent";

//Dosage situations
export const DOSAGE_GENERAL = "general";
export const DOSAGE_TRAVEL_SICKNESS = "travelSickness";
export const DOSAGE_VERTIGO_ALLERGIES = "vertigoAndAllergies";
export const DOSAGE_MILD_PAIN_FEVER = "mildPainFever";

export function getSituationDisplayName(situation) {
  switch(situation) {
    case DOSAGE_GENERAL:
      return "General";
    case DOSAGE_TRAVEL_SICKNESS:
      return "Travel sickness";
    case DOSAGE_VERTIGO_ALLERGIES:
      return "Vertigo and allergies";
    case DOSAGE_MILD_PAIN_FEVER:
      return "Mild pain and fever";
    default:
      return null;
  }
}

// Dosage target groups
export const DOSAGE_ALL = "all";
export const DOSAGE_ADULT = "adult";
export const DOSAGE_CHILD_12_18 = "child_12_18";
export const DOSAGE_CHILD_6_12 = "child_6_12";
export const DOSAGE_CHILD_2_6 = "child_2_6";

export function getTargetGroupDisplayName(target) {
  switch(target) {
    case DOSAGE_ALL:
      return "All";
    case DOSAGE_ADULT:
      return "Adult";
    case DOSAGE_CHILD_12_18:
      return "Child 12 to 18";
    case DOSAGE_CHILD_6_12:
      return "Child 6 to 12";
    case DOSAGE_CHILD_2_6:
      return "Child 2 to 6";
    default:
      return null;
  }
}
