import { DocQ, DocQParams } from "..";

export function initBlockContainer(docQ: DocQ, { blockContainerDefaultStyle }: DocQParams) {
  docQ.blockContainer = document.createElement('div');
  docQ.blockContainer.style.padding = '16px';
  docQ.blockContainer.style.background = 'rgba(0, 0, 0, 0.2)';
  docQ.blockContainer.style.borderRadius = '8px';
  docQ.blockContainer.style.marginTop = '32px';
  if (blockContainerDefaultStyle) {
    Object.keys(blockContainerDefaultStyle).forEach(name => {
      docQ.blockContainer.style[name] = blockContainerDefaultStyle[name];
    });
  }
  docQ.container.appendChild(docQ.blockContainer);
  return docQ;
}