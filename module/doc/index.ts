import { Block } from "../block";
import { EventName, EventEmitter, EventTypeMap } from "../event";
import { TextSegment } from "../paragraph";
import { init } from "./init.ts";

export interface DocQParams { 
  title: string,
  editable?: boolean,
  data: { textSegmentList: TextSegment[], disabled?: boolean; }[],
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
  public selection: Selection;
  constructor(params: DocQParams) {
    init(this, params);
  }
  public setEditable(editable: boolean) {
    if (this.editable == editable) {
      return;
    }
    this.editable = editable;
    this.container.contentEditable = editable.toString();
    this.eventEmitter.emit('editablechange', this, editable);
  }

  public mountTo(root: HTMLElement) {
    this.root = root;
    root.appendChild(this.container);
  }

  public on<T extends EventName>(eventName: T, callback: (doc: DocQ, e: EventTypeMap[T]) => void) {
    this.eventEmitter.on(eventName, callback);
  }
}