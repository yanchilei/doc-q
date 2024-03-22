import { DocQ } from "..";
import { EventEmitter } from "../../event";
import { initKeyboardEventListener } from "./keyboard";
import { initMouseEventListener } from "./mouse";
import { initSelectionListener } from "./selection";

export function initEvent(docQ: DocQ) {
  docQ.eventEmitter = new EventEmitter();
  initMouseEventListener(docQ);
  initSelectionListener(docQ);
  initKeyboardEventListener(docQ);
}