import { DocQ, DocQParams } from "..";
import { Block } from "../../block";

export function initTitle(docQ: DocQ, { title, editable, titleDefaultStyle }: DocQParams) {
  docQ.title = new Block({
    htmlStrOrDescriptor: title,
    editable: !!editable,
    defaultStyle: titleDefaultStyle,
  });
  docQ.title.mountTo(docQ.container);
  return docQ;
}