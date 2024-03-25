import { DocQ } from "..";

export function initContainer(docQ: DocQ, {containerDefaultStyle, editable}: {containerDefaultStyle?: Partial<CSSStyleDeclaration>; editable?: boolean}) {
  docQ.container.style.position = 'relative';
  docQ.container.style.padding = '160px';
  docQ.container.style.outline = 'none';
  docQ.container.setAttribute('contenteditable', editable ? 'true' : 'false');
  docQ.container.classList.add('doc-q-editable');
  if (containerDefaultStyle) {
    Object.keys(containerDefaultStyle).forEach(name => {
      docQ.container.style[name] = containerDefaultStyle[name];
    });
  }
  return docQ;
}