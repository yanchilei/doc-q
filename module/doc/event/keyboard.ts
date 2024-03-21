import { DocQ } from "..";

export function initKeyboardEventListener(doc: DocQ) {
  doc.container.addEventListener('keydown', e => {
    e.preventDefault();
    doc.eventEmitter.emit('keydown', doc, e);
  });

  doc.container.addEventListener('keyup', e => {
    e.preventDefault();
    doc.eventEmitter.emit('keyup', doc, e);
  })
}