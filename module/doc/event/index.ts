import { DocQ } from "..";
import { initKeyboardEventListener } from "./keyboard";
import { initMouseEventListener } from "./mouse";
import { initSelectionListener } from "./selection";

export function initEvent(docQ: DocQ) {
  initMouseEventListener(docQ);
  initSelectionListener(docQ);
  initKeyboardEventListener(docQ);
}