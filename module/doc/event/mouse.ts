import { DocQ } from "..";

export function initMouseEventListener(doc: DocQ) {
  doc.container.addEventListener('click', e => {
    e.stopPropagation();
    doc.eventEmitter.emit('click', doc, e);
  });

  doc.container.addEventListener('dragstart', e => {
    e.preventDefault();
  });
}