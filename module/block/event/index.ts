import { Block } from "..";
import { DocQ } from "../../doc";

export function initEvent(block: Block, doc: DocQ) {
  block.el.addEventListener('mouseenter', () => {
    if (!block.disabled) {
      block.el.style.backgroundColor = '#f9f9f9';
    }
    block.eventEmitter.emit('mouseenter', { block });
  });
  block.el.addEventListener('mouseleave', () => {
    block.el.style.backgroundColor = 'transparent';
    block.eventEmitter.emit('mouseleave', { block });
  });

  block.plugin.onMouseEnter && block.eventEmitter.on('mouseenter', block.plugin.onMouseEnter);
  block.plugin.onMouseLeave && block.eventEmitter.on('mouseleave', block.plugin.onMouseLeave);
  block.plugin.onKeyDown && block.eventEmitter.on('keydown', block.plugin.onKeyDown);
  block.plugin.onActive && block.eventEmitter.on('active', block.plugin.onActive);
  block.plugin.onInactive && block.eventEmitter.on('inactive', block.plugin.onInactive);
}