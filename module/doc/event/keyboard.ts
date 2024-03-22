import { DocQ } from "..";

export function initKeyboardEventListener(doc: DocQ) {
  doc.container.addEventListener('keydown', e => {
    e.preventDefault();
    doc.eventEmitter.emit('keydown', { context: doc.context, event: e });
  });

  doc.container.addEventListener('keyup', e => {
    e.preventDefault();
    doc.eventEmitter.emit('keyup', { context: doc.context, event: e });
  })
}