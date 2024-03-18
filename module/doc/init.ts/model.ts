import { DocQ, DocQParams } from "..";
import { Block } from "../../block";

export function initModel(
  docQ: DocQ,
  {
    htmlStrOrDescriptorList,
    editable,
    blockDefaultStyle,
  }: DocQParams) {
  docQ.model = htmlStrOrDescriptorList?.map((htmlStrOrDescriptor) => new Block({
    htmlStrOrDescriptor,
    editable,
    defaultStyle: blockDefaultStyle,
  }));
  docQ.model.forEach(block => {
    block.on('click', () => { console.log('click: ', block) });
    block.mountTo(docQ.blockContainer);
  });
}