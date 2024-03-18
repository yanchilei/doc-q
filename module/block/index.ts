import { BlockEventName, eventWrapper } from "./event/wrapper";
import { descriptorToHtmlStr, htmlStrToDescriptor } from "./parse";

export interface StyleRange {
  from: number;
  to: number;
  style: {
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    backgroundColor?: string;
  };
}

export interface Descriptor {
  plainText: string;
  styleLine: StyleRange[];
}

export class Block {
  constructor({
    htmlStrOrDescriptor,
    editable,
    defaultStyle,
  }: {
    htmlStrOrDescriptor?: string | Descriptor;
    editable?: boolean;
    defaultStyle?: Partial<CSSStyleDeclaration>;
  }) {
    this.editableElement = document.createElement('div');
    if (editable) {
      this.editableElement.contentEditable = 'true';
      this.editable = true;
    }
    this.editableElement.style.outline = 'none';
    if (defaultStyle) {
      Object.keys(defaultStyle).forEach(name => {
        this.editableElement.style[name] = defaultStyle[name];
      })
    }
    eventWrapper(this, this.editableElement);

    if (typeof htmlStrOrDescriptor === 'string') {
      this.htmlStr = htmlStrOrDescriptor;
      this.descriptor = Block.htmlStrToDescriptor(htmlStrOrDescriptor);
    } else if (typeof htmlStrOrDescriptor === 'object') {
      this.descriptor = htmlStrOrDescriptor;
      this.htmlStr = Block.descriptorToHtmlStr(htmlStrOrDescriptor);
    }
    this.editableElement.innerHTML = this.htmlStr;
  }

  public on: (eventName: BlockEventName, listener: (e: MouseEvent) => void) => void;
  public editable = false;
  public setEditable(editable: boolean) {
    this.editable = editable;
    this.editableElement.contentEditable = editable.toString();
  }

  public htmlStr: string;
  public descriptor: Descriptor;
  static descriptorToHtmlStr: (descriptor: Descriptor) => string = descriptorToHtmlStr;
  static htmlStrToDescriptor: (htmlStr: string) => Descriptor = htmlStrToDescriptor;

  public mountTo(root: HTMLElement) {
    root.appendChild(this.editableElement);
    return this;
  }

  public editableElement: HTMLDivElement | null = null;
  public remove() {
    if (this.editableElement) {
      this.editableElement.remove();
    }
  }

  // TO DO：劫持和封装原生content editable的所有事件监听
  // TO DO: 维护编辑过程中的样式上下文
}