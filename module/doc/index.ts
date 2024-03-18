import { Block, Descriptor } from "../block";
import { EventName, EventEmitter } from "../event-emitter";
import { init } from "./init.ts";

export interface DocQParams { 
  title: string,
  editable?: boolean,
  htmlStrOrDescriptorList: (string | Descriptor)[],
  containerDefaultStyle?: Partial<CSSStyleDeclaration>,
  titleDefaultStyle?: Partial<CSSStyleDeclaration>,
  blockContainerDefaultStyle?: Partial<CSSStyleDeclaration>,
  blockDefaultStyle?: Partial<CSSStyleDeclaration>,
}


export class DocQ {
  public editable = false;
  public title: Block;
  public model: Block[];
  public currentElement: HTMLElement;
  public root: HTMLElement;
  public container: HTMLDivElement;
  public blockContainer: HTMLDivElement;
  public eventEmitter: EventEmitter;
  constructor(params: DocQParams) {
    init(this, params);
  }
  public setEditable(editable: boolean) {
    if (this.editable == editable) {
      return;
    }
    this.editable = editable;
    this.title.setEditable(editable);
    this.model.forEach(block => block.setEditable(editable));
    this.eventEmitter.emit(EventName.DocEditableChange, editable);
  }

  public setModelByIndex(index: number, block: Block) {
    this.model[index] = block;
    this.eventEmitter.emit(EventName.DocModelChange, { index, block });
  }

  public mountTo(root: HTMLElement) {
    this.root = root;
    root.appendChild(this.container);
  }
}