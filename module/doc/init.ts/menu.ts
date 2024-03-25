import { DocQ } from "..";
import { PluginMenu } from "../../menu";

export function initMenu(doc: DocQ) {
  doc.pluginMenu  = new PluginMenu({ doc });
  doc.blockContainer.appendChild(doc.pluginMenu.el);
}