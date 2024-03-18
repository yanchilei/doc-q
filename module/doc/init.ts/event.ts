import { DocQ } from "..";
import { EventName } from "../../event-emitter";

export function initEvent(docQ: DocQ) {
  // 容器顶部，用于订阅全局事件监听
  docQ.container.addEventListener('click', e => {
    e.stopPropagation();
    docQ.eventEmitter.emit(EventName.DocClick, e);
  })
  document.addEventListener('keydown', e => {
    e.stopPropagation();
    docQ.eventEmitter.emit(EventName.DocKeyDown, e);
  });
  document.addEventListener('keypress', e => {
    e.stopPropagation();
    docQ.eventEmitter.emit(EventName.DocKeyPress, e);
  });
  document.addEventListener('keyup', e => {
    e.stopPropagation();
    docQ.eventEmitter.emit(EventName.DocKeyUp, e);
  });
  docQ.eventEmitter.on(EventName.DocClick, (e: MouseEvent) => {
    const { target } = e;
    if (docQ.currentElement !== target) {
      docQ.currentElement = target as HTMLElement;
      docQ.eventEmitter.emit(EventName.DocCurrentChange, target);
    }
  });
  docQ.eventEmitter.on(EventName.DocEditableChange, (editable: boolean) => {
    console.log(EventName.DocEditableChange, editable);
  })
}