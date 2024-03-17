import { Segment } from "../../type/segment";
import { cursor } from "../cursor";
import { EventName, eventEmitter } from "../event-emitter";
import { segmentRender } from "../render";
import { cursorRender } from "../render/cursor-render";


export class DocQ {
  constructor(
    params: { 
      el: HTMLElement
    }
  ) {
    const { el } = params;
    this.el = el;
  }

  public editable = true;
  public showCursor = true;
  public el: HTMLElement | null = null;
  public cursor = cursor;
  public model: { title: string; content: Segment[] } = null;

  public currentElement: HTMLElement | null = null;
  public container: HTMLDivElement | null = null;


  public setEditable(editable: boolean) {
    if (this.editable == editable) {
      return;
    }
    this.editable = editable;
    eventEmitter.emit(EventName.DocEditableChange, editable);
  }

  public setModel(model: { title: string; content: Segment[] }) {
    this.model = model;
    eventEmitter.emit(EventName.DocModelChange, model);
  }

  public init(model: { title: string; content: Segment[] }, root: HTMLElement) {

    // 容器顶部，用于订阅全局事件监听
    const div = document.createElement('div');
    div.style.position = 'relative';
    div.style.borderTop = '1px solid transparent';
    this.container = div;
    div.addEventListener('click', e => {
      e.stopPropagation();
      eventEmitter.emit(EventName.DocClick, e);
    })
    document.addEventListener('keydown', e => {
      e.stopPropagation();
      eventEmitter.emit(EventName.DocKeyDown, e);
    });
    document.addEventListener('keypress', e => {
      e.stopPropagation();
      eventEmitter.emit(EventName.DocKeyPress, e);
    });
    document.addEventListener('keyup', e => {
      e.stopPropagation();
      eventEmitter.emit(EventName.DocKeyUp, e);
    })
    root.appendChild(div);

    eventEmitter.on(EventName.DocClick, (e: MouseEvent) => {
      const { target } = e;
      if (this.currentElement !== target) {
        this.currentElement = target as HTMLElement;
        eventEmitter.emit(EventName.DocCurrentChange, target);
      }
    })

    // 初始化状态
    this.model = model;
    this.el = root;
    const { title, content } = model;


    // 初始化视图
    const h1 = document.createElement('h1');
    h1.innerText = title;
    div.appendChild(h1);
    content.forEach((segment) => {
      const dom = segmentRender(segment);
      div.appendChild(dom);
    });

    // 初始化游标
    if (this.editable) {
      this.cursor.init()
      div.appendChild(this.cursor.el);
    }
  }
}