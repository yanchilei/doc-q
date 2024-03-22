import { Block } from "../block";
import { EventName, EventEmitter, EventParameterMap } from "../event";
import { TextSegment } from "../paragraph";
import { Context } from "./context";
import { init } from "./init.ts";

export interface DocQParams { 
  title: string,
  editable?: boolean,
  data: { p: TextSegment[], disabled?: boolean; }[],
  containerDefaultStyle?: Partial<CSSStyleDeclaration>,
  titleDefaultStyle?: Partial<CSSStyleDeclaration>,
  blockContainerDefaultStyle?: Partial<CSSStyleDeclaration>,
  blockDefaultStyle?: Partial<CSSStyleDeclaration>,
}


export class DocQ {
  public editable = false;
  public title: Block;
  public model: Block[];
  public root: HTMLElement;
  public container: HTMLDivElement;
  public blockContainer: HTMLDivElement;
  public eventEmitter: EventEmitter;
  public context: Context;
  constructor(params: DocQParams) {
    init(this, params);
  }
  public setEditable(editable: boolean) {
    if (this.editable == editable) {
      return;
    }
    this.editable = editable;
    this.container.contentEditable = editable.toString();
    this.eventEmitter.emit('editablechange', { editable, context: this.context });
  }

  public mountTo(root: HTMLElement) {
    this.root = root;
    root.appendChild(this.container);
  }

  public on<T extends EventName>(eventName: T, callback: (payload: EventParameterMap[T]) => void) {
    this.eventEmitter.on(eventName, callback);
  }
}