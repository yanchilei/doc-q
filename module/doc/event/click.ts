import { DocQ } from "..";

export function initClickListener(doc: DocQ) {
  doc.container.addEventListener('click', e => {
    e.stopPropagation();
    doc.eventEmitter.emit('click', doc, e);
  });
}