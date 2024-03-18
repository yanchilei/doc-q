import { DocQ } from "..";

export function initContainer(docQ: DocQ, {containerDefaultStyle}: {containerDefaultStyle?: Partial<CSSStyleDeclaration>}) {
  docQ.container = document.createElement('div');
  docQ.container.style.position = 'relative';
  docQ.container.style.padding = '16px';
  if (containerDefaultStyle) {
    Object.keys(containerDefaultStyle).forEach(name => {
      docQ.container.style[name] = containerDefaultStyle[name];
    });
  }
  return docQ;
}