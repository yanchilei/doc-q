import { DocQ } from "..";
import { Block } from "../../block";

export function initMouseEventListener(doc: DocQ) {
  doc.container.addEventListener('click', e => {
    e.stopPropagation();
    doc.pluginMenu.hide();
    const block = doc.model.find(block => block.contentContainer.contains(e.target as Node));
    if (block) {
      doc.context.currentClickedBlock = block;
      doc.eventEmitter.emit('click', { block, context: doc.context });
      doc.model.forEach(block => block.setActive(false));
      block.setActive(true);
    } else {
      doc.context.currentClickedBlock = null;
      doc.model.forEach(block => block.setActive(false));
    }
  });

  doc.container.addEventListener('dragstart', e => {
    e.preventDefault();
  });

  doc.container.addEventListener('mouseover', e => {
    const block = [doc.title, ...doc.model].find(block => block.container.contains(e.target as Node));
    if (block) {
      doc.context.currentHoveredBlock = block;

      doc.eventEmitter.emit('mouseover', { block, context: doc.context });
    } else {
      doc.context.currentHoveredBlock = null;
    }
  });
}