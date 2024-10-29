// To parse this data:
//
//   import { Convert } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Welcome {
  _id: number;
  ci: number;
  name: string;
  surname: string;
  email: null | string;
  phone_number: number | null;
  password: string;
  roles: string[];
  birthdate: Date | null;
  tokens: string[];
  profileImg: null;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
