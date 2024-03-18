import { Block } from "..";
import { EventEmitter } from "../../event-emitter";

export type BlockEventName = 'click'

export function eventWrapper(block: Block, editableElement: HTMLDivElement) {
  const on = function(eventName: BlockEventName, fn: (e: MouseEvent) => void) {
    if (eventName === 'click') {
      editableElement.addEventListener('click', fn);
    }
  }
  block.on = on;
}