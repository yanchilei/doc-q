import { DocQ, DocQParams } from "..";
import { Block } from "../../block";
import { Paragraph } from "../../text-segment";

export function initModel(
  docQ: DocQ,
  {
    data,
    blockDefaultStyle,
  }: DocQParams) {
  docQ.model = data.map((textSegmentList) => new Block({
    paragraph: new Paragraph(textSegmentList),
    defaultStyle: blockDefaultStyle,
  }));
  docQ.model.forEach(block => {
    block.mountTo(docQ.blockContainer);
  });
}