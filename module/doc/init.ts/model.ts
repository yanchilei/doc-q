import { DocQ, DocQParams } from "..";
import { Block, BlockAbility } from "../../block";
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
      enable: [BlockAbility.CapitalMenu],
    })
  });
  docQ.model.push(new Block({
    basicData: { type: BasicPluginType.TEXT, content: [] },
    doc: docQ,
    enable: [BlockAbility.CapitalMenu],
  }))
  docQ.model.forEach(block => {
    block.mountTo(docQ.blockContainer);
  });
}