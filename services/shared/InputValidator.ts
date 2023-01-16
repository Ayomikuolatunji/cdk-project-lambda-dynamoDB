import { Hello } from "./Model";

export class MissingFieldError extends Error {}

export function validateHelloEntry(args: any) {
  if (!(args as Hello).name) {
    throw new MissingFieldError("Value for name required!");
  }
  if (!(args as Hello).username) {
    throw new MissingFieldError("Value for username required!");
  }
  if (!(args as Hello).friend) {
    throw new MissingFieldError("Value for friend required!");
  }
  if (!(args as Hello).location) {
    throw new MissingFieldError("Value for location required!");
  }
}
