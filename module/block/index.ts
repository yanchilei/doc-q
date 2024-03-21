import { Paragraph } from "../paragraph";
import { initElement } from "./init";

export class Block {
  constructor({
    paragraph,
    defaultStyle,
    disabled,
  }: {
    paragraph: Paragraph;
    defaultStyle?: Partial<CSSStyleDeclaration>;
    disabled?: boolean;
  }) {
    initElement(this, {paragraph, defaultStyle, disabled});
  }

  public disabled = false;
  public setDisabled(disabled: boolean) {
    if (this.disabled === disabled) {
      return;
    }
    this.disabled = disabled;
    if (disabled) {
      this.el.style.userSelect = 'none';
      this.el.contentEditable = 'false';
    } else {
      this.el.style.userSelect = 'auto';
      this.el.contentEditable = 'true';
    }
  }

  public mountTo(root: HTMLElement) {
    root.appendChild(this.el);
    return this;
  }

  public el: HTMLDivElement | null = null;
  public remove() {
    if (this.el) {
      this.el.remove();
    }
  }

  public paragraph: Paragraph;
}