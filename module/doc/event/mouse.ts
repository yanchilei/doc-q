import { DocQ } from "..";

export function initMouseEventListener(doc: DocQ) {
  doc.container.addEventListener('click', e => {
    e.stopPropagation();
    doc.eventEmitter.emit('click', { doc });
  });

  doc.container.addEventListener('dragstart', e => {
    e.preventDefault();
  });

  doc.container.addEventListener('mouseover', e => {
    const block = [doc.title, ...doc.model].find(block => block.el.contains(e.target as Node));
    if (block) {
      doc.context.currentHoveredBlock = block;
      doc.eventEmitter.emit('mouseover', { block, context: doc.context });
    } else {
      doc.context.currentHoveredBlock = null;
    }
  });
}