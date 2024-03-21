import { DocQ } from "..";
import { getSelectedElements } from "../../../utils/selection";
import { initClickListener } from "./click";
import { initKeyboardEventListener } from "./keyboard";
import { initSelectionListener } from "./selection";

export function initEvent(docQ: DocQ) {
  initClickListener(docQ);
  initSelectionListener(docQ);
  initKeyboardEventListener(docQ);
}