import { Block } from "..";
import { DocQ } from "../../doc";

export function initEvent(block: Block, doc: DocQ) {
  block.container.addEventListener('mouseenter', () => {
    block.eventEmitter.emit('mouseenter', { block });
    if (!block.disabled && !doc.pluginMenu.isShow) {
      block.contentContainer.style.backgroundColor = '#f9f9f9';
      block.capitalMenuContainer && (block.capitalMenuContainer.style.display = 'flex');
    }
  });
  block.container.addEventListener('mouseleave', () => {
    block.eventEmitter.emit('mouseleave', { block });
    block.contentContainer.style.backgroundColor = 'transparent';
    block.capitalMenuContainer && (block.capitalMenuContainer.style.display = 'none');
  });

  initDocEvent(block, doc);
  initPluginEvent(block);
}

export function initDocEvent(block: Block, doc: DocQ) {
  doc.on('pluginMenuShow', () => {
    block.capitalMenuContainer && (block.capitalMenuContainer.style.display = 'none');
  });
}

export function initPluginEvent(block: Block) {
  block.plugin.onMouseEnter && block.eventEmitter.on('mouseenter', block.plugin.onMouseEnter);
  block.plugin.onMouseLeave && block.eventEmitter.on('mouseleave', block.plugin.onMouseLeave);
  block.plugin.onKeyDown && block.eventEmitter.on('keydown', block.plugin.onKeyDown);
  block.plugin.onActive && block.eventEmitter.on('active', block.plugin.onActive);
  block.plugin.onInactive && block.eventEmitter.on('inactive', block.plugin.onInactive);
}