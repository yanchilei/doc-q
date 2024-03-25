import { DocQ, DocQParams } from "..";

export function initBlockContainer(docQ: DocQ, { blockContainerDefaultStyle }: DocQParams) {
  docQ.blockContainer = document.createElement('div');
  docQ.blockContainer.style.marginTop = '32px';
  docQ.blockContainer.style.position = 'relative';
  if (blockContainerDefaultStyle) {
    Object.keys(blockContainerDefaultStyle).forEach(name => {
      docQ.blockContainer.style[name] = blockContainerDefaultStyle[name];
    });
  }
  docQ.container.appendChild(docQ.blockContainer);
  return docQ;
}