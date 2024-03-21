import { DocQ, DocQParams } from "..";
import { Block } from "../../block";
import { Paragraph } from "../../paragraph";

export function initModel(
  docQ: DocQ,
  {
    data,
    blockDefaultStyle,
  }: DocQParams) {
  docQ.model = data.map(({textSegmentList, disabled}) => new Block({
    paragraph: new Paragraph(textSegmentList),
    defaultStyle: blockDefaultStyle,
    disabled,
  }));
  docQ.model.forEach(block => {
    block.mountTo(docQ.blockContainer);
  });
}