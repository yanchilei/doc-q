import { isDebug } from "../config/constant";

export function log(e: any) {
  if (!isDebug) {
    return;
  }
  console.log(e);
}