import { DocQ } from "../doc";
import { Context } from "../doc/context";
import { EventEmitter } from "../event";
import { Paragraph } from "../paragraph";
import { initEvent } from "./event";
import { initElement } from "./init";

export class Block {
  constructor({
    paragraph,
    defaultStyle,
    disabled,
    doc,
  }: {
    paragraph: Paragraph;
    defaultStyle?: Partial<CSSStyleDeclaration>;
    disabled?: boolean;
    doc: DocQ;
  }) {
    initElement(
      this, {
        paragraph,
        defaultStyle,
        disabled,
        doc,
      });

    initEvent(this, doc);
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

  public el: HTMLDivElement = null;
  public remove() {
    if (this.el) {
      this.el.remove();
    }
  }

  public paragraph: Paragraph;

  public eventEmitter: EventEmitter;
  public doc: DocQ = null;
  public onMouseEnter = (cb: (payload: { block: Block, context: Context }) => void) => {
    this.eventEmitter.on('mouseenterblock', cb);
  }
}