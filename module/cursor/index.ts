import { getClosestCharPosition } from "../../utils/dom";
import { EventName, eventEmitter } from "../event-emitter";
import { cursorRender } from "../render/cursor-render";

class Cursor {
  constructor() {
    eventEmitter.on(EventName.DocClick, (e: MouseEvent) => {
      const { clientX, clientY, target } = e;
      const nodeList = (target as HTMLElement).childNodes;
      const textNodeList = Array.prototype.filter.call(nodeList, (node) => {
        return node.nodeType === 3;
      });
      if (textNodeList.length === 0) {
        this.setShow(false);
        return;
      }
      const { rect } = getClosestCharPosition(textNodeList, clientX, clientY);
      if (!rect) {
        this.setShow(false);
        return;
      }
      const { left, top, height } = rect;
      this.setPosition({ left, top, height });
      this.setShow(true);
    });
    // 监听点击事件更新游标位置
    eventEmitter.on(EventName.CursorPositionChange, ({ left, top, height }) => {
      const cursor = document.getElementById('cursor');
      if (cursor) {
        cursor.style.left = `${left}px`;
        cursor.style.top = `${top}px`;
        cursor.style.height = `${height}px`;
        cursor.style.display = 'block';
      }
    });
    // TO DO: 监听键盘按键更新游标位置
  }
  public position = { left: 0, top: 0, height: 0 };
  public show = true;
  public el: HTMLElement = null;

  public setPosition(position: { left: number, top: number; height: number }) {
    const { left, top, height } = position;
    if (
      this.position.left === left && 
      this.position.top === top &&
      this.position.height === height
    ) {
      return;
    }
    this.position = position;
    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
    this.el.style.height = `${height}px`;
    this.el.style.display = 'block';
    eventEmitter.emit(EventName.CursorPositionChange, { left, top, height });
  }

  public setShow(show: boolean) {
    if (this.show === show) {
      return;
    }
    this.show = show;
    show ? this.el.style.display = 'block' : this.el.style.display = 'none';
    eventEmitter.emit(EventName.CursorShowChange, show);
  }

  public init() {
    const cursor = cursorRender({ left: 0, top: 0 });
    cursor.id = 'cursor';
    cursor.style.display = 'none';
    this.el = cursor;
  }
}

export const cursor = new Cursor();