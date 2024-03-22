import { Block } from "..";
import { DocQ } from "../../doc";
import { EventEmitter } from "../../event";

export function initEvent(block: Block, doc: DocQ) {
  block.eventEmitter = new EventEmitter();

  block.el.addEventListener('mouseenter', () => {
    block.el.style.backgroundColor = '#f0f0f0';
    block.eventEmitter.emit('mouseenterblock', { block, context: doc.context });
  });

  block.el.addEventListener('mouseleave', () => {
    block.el.style.backgroundColor = 'transparent';
    block.eventEmitter.emit('mouseleaveblock', { block, context: doc.context });
  });
}