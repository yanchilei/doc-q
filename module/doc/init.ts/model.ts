import { DocQ, DocQParams } from "..";
import { Block } from "../../block";
import { Paragraph } from "../../paragraph";

export function initModel(
  docQ: DocQ,
  {
    data,
    blockDefaultStyle,
  }: DocQParams) {
  docQ.model = data.map(({p, disabled}) => new Block({
    paragraph: new Paragraph(p),
    defaultStyle: blockDefaultStyle,
    disabled,
    doc: docQ,
  }));
  docQ.model.forEach(block => {
    block.mountTo(docQ.blockContainer);
  });
}