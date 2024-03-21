import { Block } from ".";
import { Paragraph } from "../text-segment";

export function initElement(block: Block, {defaultStyle, paragraph}: {defaultStyle: Partial<CSSStyleDeclaration>, paragraph: Paragraph}) {
  block.el = document.createElement('div');
  block.el.style.margin = '8px 0';
  block.el.innerHTML = paragraph.html;
  block.paragraph = paragraph;
  if (defaultStyle) {
    Object.keys(defaultStyle).forEach(name => {
      block.el.style[name] = defaultStyle[name];
    })
  }
}