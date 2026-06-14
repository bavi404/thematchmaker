/** ISO 8601 date string (YYYY-MM-DD) */
export type ISODateString = `${number}-${number}-${number}`;

export type Gender = "male" | "female";

export type CustomerStatus =
  | "NEW"
  | "VERIFIED"
  | "MATCHING"
  | "INTRO SENT"
  | "ACTIVE MATCH"
  | "SUCCESS";

export type MaritalStatus =
  | "never-married"
  | "divorced"
  | "widowed"
  | "separated";

export type DietPreference =
  | "vegetarian"
  | "non-vegetarian"
  | "vegan"
  | "eggetarian"
  | "jain"
  | "other";

export type FamilyType = "nuclear" | "joint" | "extended";

export interface Customer {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: Gender;
  readonly dob: ISODateString;
  readonly age: number;
  readonly city: string;
  readonly country: string;
  readonly height: number;
  readonly email: string;
  readonly phone: string;
  readonly religion: string;
  readonly income: number;
  readonly company: string;
  readonly designation: string;
  readonly degree: string;
  readonly college: string;
  readonly languages: readonly string[];
  readonly siblings: number;
  readonly maritalStatus: MaritalStatus;
  readonly wantsKids: boolean;
  readonly openToRelocate: boolean;
  readonly openToPets: boolean;
  readonly motherTongue: string;
  readonly dietPreference: DietPreference;
  readonly familyType: FamilyType;
  readonly hobbies: readonly string[];
  readonly status: CustomerStatus;
}

export function getCustomerDisplayLocation(customer: Customer): string {
  return `${customer.city}, ${customer.country}`;
}

export function getCustomerFullName(customer: Pick<Customer, "firstName" | "lastName">): string {
  return `${customer.firstName} ${customer.lastName}`;
}
