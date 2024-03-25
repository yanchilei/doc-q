import { DocQ } from "..";
import { getSelectedBlocksPosition } from "../../../utils/selection";
import { Block } from "../../block";

export function initSelectionListener(doc: DocQ) {
  document.addEventListener('selectionchange', e => {
    const selection = window.getSelection();
    if (isInBlockContainer(doc, selection)) {
      const selectedBlocksPosition = getSelectedBlocksPosition(doc, selection)[0];
      doc.context.currentSelectPosition = selectedBlocksPosition;
      doc.eventEmitter.emit('selectionchange', { selection, context: doc.context });

      selectionBlockDispatch(doc, selectedBlocksPosition);
    }
  });
}

function isInBlockContainer(doc: DocQ, selection: Selection) {
  const { anchorNode, focusNode } = selection;
  let anchorInBlock = false;
  let focusInBlock = false;
  for (let i = 0; i < doc.model.length; i++) {
    const block = doc.model[i];
    if (block.contentContainer.contains(anchorNode)) {
      anchorInBlock = true;
    }
    if (block.contentContainer.contains(focusNode)) {
      focusInBlock = true;
    }
  }
  return anchorInBlock && focusInBlock;
}

function selectionBlockDispatch(doc: DocQ, selectedBlocksPosition: {
  selectedBlocks: Block[];
  start: number;
  end: number;
}) {
  const { selectedBlocks, start, end } = selectedBlocksPosition;
  for (let i = 0; i < doc.model.length; i++) {
    doc.model[i].selectedPosition = { type: 'none' };
  }
  for (let i = 0; i < selectedBlocks.length; i++) {
    const payload: { type: 'full'| 'none' | 'part'; start?: number; end?: number } = { type: 'full' };
    if (i === 0 && start >= 0) {
      payload.type = 'part';
      payload.start = start;
    } else if (i === selectedBlocks.length - 1 && end >= 0) {
      payload.end = end;
      payload.type = 'part';
    } else {
      payload.type = 'full';
    }
    selectedBlocks[i].selectedPosition = payload;
  }
}