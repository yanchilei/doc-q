import { Block } from ".";
import { BasicPlugin } from "../plugin";

export function initPlugin(block: Block, plugin: BasicPlugin) {
  if (!plugin.render) {
    throw new Error(`plugin: ${block.plugin.type} has no render function`);
  }
  block.plugin = plugin;
}

export function initElement(block: Block, payload: { disabled?: boolean } = {}) {
  const { disabled } = payload;
  block.el = document.createElement('div');
  block.el.style.margin = '8px 0';
  block.el.style.fontSize = '14px';
  block.el.style.minHeight = '14px';
  block.setDisabled(!!disabled);
  if (block.defaultStyle) {
    Object.keys(block.defaultStyle).forEach(name => {
      block.el.style[name] = block.defaultStyle[name];
    });
  }
  block.el.innerHTML = block.plugin.render(block.content);
}