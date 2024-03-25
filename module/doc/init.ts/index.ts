import { DocQ, DocQParams } from "..";
import { initBlockContainer } from "./block-container";
import { initContainer } from "./container";
import { initEvent } from "../event";
import { initModel } from "./model";
import { initTitle } from "./title";
import { Context } from "../context";
import { initMenu } from "./menu";

export function init(docQ: DocQ, params: DocQParams) {
  docQ.editable = !!params.editable;
  initContainer(docQ, params);
  initTitle(docQ, params);
  initBlockContainer(docQ, params);
  initModel(docQ, params);
  initEvent(docQ);
  initMenu(docQ);

  docQ.context = new Context();
  docQ.context.blocks = docQ.model;
}