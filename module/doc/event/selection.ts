import { DocQ } from "..";

export function initSelectionListener(doc: DocQ) {
  document.addEventListener('selectionchange', e => {
    const selection = window.getSelection();
    if (isInBlockContainer(doc, selection)) {
      doc.selection = selection;
      doc.eventEmitter.emit('selectionchange', doc, selection);
    }
  });
}

function isInBlockContainer(doc: DocQ, selection: Selection) {
  const { anchorNode, focusNode } = selection;
  let anchorInBlock = false;
  let focusInBlock = false;
  for (let i = 0; i < doc.model.length; i++) {
    const block = doc.model[i];
    if (block.el.contains(anchorNode)) {
      anchorInBlock = true;
    }
    if (block.el.contains(focusNode)) {
      focusInBlock = true;
    }
  }
  return anchorInBlock && focusInBlock;
}