import { DocQ, DocQParams } from "..";
import { Block } from "../../block";
import { BasicPluginType } from "../../plugin";

export function initModel(
  docQ: DocQ,
{
  data = [],
  blockDefaultStyle,
}: DocQParams) {
  docQ.model = data.map(basicData => {
    return new Block({
      basicData,
      defaultStyle: blockDefaultStyle,
      doc: docQ,
    })
  });
  docQ.model.push(new Block({
    basicData: { type: BasicPluginType.TEXT, content: [] },
    doc: docQ,
  }))
  docQ.model.forEach(block => {
    block.mountTo(docQ.blockContainer);
  });
}