import { Block } from "../module/block";
import { DocQ } from "../module/doc";

export function getSelectedBlocksPosition(doc: DocQ, selection: Selection) {
  const blocks: Block[] = [doc.title, ...doc.model];
  const selects: { selectedBlocks: Block[], start: number, end: number }[] = [];
  for (let i = 0; i < selection.rangeCount; i++) {
    let startBlock: Block = null;
    let endBlock: Block = null;
    const singleSelectedBlocks: Block[] = []
    const range = selection.getRangeAt(i);
    const { startContainer, startOffset, endContainer, endOffset } = range;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block.contentContainer.contains(startContainer)) {
        startBlock = block;
      }
      if (block.contentContainer.contains(endContainer)) {
        endBlock = block;
      }
      if (startBlock && endBlock) {
        break;
      }
    }
    if (startBlock === endBlock) {
      singleSelectedBlocks.push(startBlock);
    } else {
      const startIndex = blocks.indexOf(startBlock);
      const endIndex = blocks.indexOf(endBlock);
      for (let i = startIndex; i <= endIndex; i++) {
        !blocks[i].disabled && singleSelectedBlocks.push(blocks[i]);
      }
    }
    selects.push({
      selectedBlocks: singleSelectedBlocks,
      start: startOffset,
      end: endOffset,
    });
  }
  return selects;
}