import { DocQ, DocQParams } from "..";
import { Block } from "../../block";
import { BasicPluginType } from "../../plugin";

export function initTitle(docQ: DocQ, { title, titleDefaultStyle }: DocQParams) {
  docQ.title = new Block({
    basicData: { type: BasicPluginType.TEXT, content: [{ text: title || '' }] },
    defaultStyle: {
      padding: '16px 0',
      fontSize: '48px',
      minHeight: '54px',
      fontWeight: '700',
      borderBottom: 'solid 1px #e4e4e4',
      ...titleDefaultStyle,
    },
    doc: docQ,
  });
  docQ.title.mountTo(docQ.container);
  return docQ;
}