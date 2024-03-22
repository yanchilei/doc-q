import { Block } from ".";
import { DocQ } from "../doc";
import { Paragraph } from "../paragraph";

export function initElement(
  block: Block,
  {
    defaultStyle,
    paragraph,
    disabled,
    doc,
  }: {
    defaultStyle: Partial<CSSStyleDeclaration>;
    paragraph: Paragraph;
    disabled?: boolean;
    doc: DocQ;
  }
) {
  block.el = document.createElement('div');
  block.el.style.margin = '8px 0';
  block.el.style.minHeight = `${defaultStyle?.lineHeight || 14}px`;
  block.el.innerHTML = paragraph.html;
  block.paragraph = paragraph;
  block.setDisabled(disabled);
  if (defaultStyle) {
    Object.keys(defaultStyle).forEach(name => {
      block.el.style[name] = defaultStyle[name];
    });
  }

  block.doc = doc;
}