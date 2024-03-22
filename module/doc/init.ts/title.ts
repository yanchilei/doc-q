import { DocQ, DocQParams } from "..";
import { Block } from "../../block";
import { Paragraph } from "../../paragraph";

export function initTitle(docQ: DocQ, { title, titleDefaultStyle }: DocQParams) {
  const paragraph = new Paragraph([{ text: title }]);
  docQ.title = new Block({
    paragraph,
    defaultStyle: {
      padding: '16px 0',
      fontSize: '48px',
      fontWeight: '700',
      borderBottom: 'solid 1px #e4e4e4',
      ...titleDefaultStyle,
    },
    doc: docQ,
  });
  docQ.title.mountTo(docQ.container);
  return docQ;
}