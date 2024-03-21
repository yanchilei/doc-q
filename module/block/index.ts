import { Paragraph } from "../text-segment";
import { BlockEventName, eventWrapper } from "./event/wrapper";
import { initElement } from "./init";

export class Block {
  constructor({
    paragraph,
    defaultStyle,
  }: {
    paragraph: Paragraph;
    defaultStyle?: Partial<CSSStyleDeclaration>;
  }) {
    initElement(this, {defaultStyle, paragraph});
    eventWrapper(this, this.el);
  }

  public on: (eventName: BlockEventName, listener: (e: MouseEvent) => void) => void;
  public setEditable(editable: boolean) {
    this.el.contentEditable = editable.toString();
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