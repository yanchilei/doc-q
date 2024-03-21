import { camelCaseToKebabCase } from "../../utils/string";

export interface SpanStyle {
  color?: string;
  background?: string;
}

export interface TextSegment {
  text: string;
  style?: SpanStyle;
}

export class Paragraph {
  constructor(list: TextSegment[]) {
    this.list = list;
  }
  public list: TextSegment[] = [];
  public add(textSpan: TextSegment) {
    this.list.push(textSpan);
  }
  public insert(index: number, textSpan: TextSegment) {
    this.list.splice(index, 0, textSpan);
  }

  get html() {
    let h = '';
    for (let i = 0; i < this.list.length; i++) {
      const span = this.list[i];
      h += '<span';

      if (span.style) {
        const keys = Object.keys(span.style || {});
        if (keys.length > 0) {
          h += ` style="`;
          keys.forEach(name => {
            const kebabName = camelCaseToKebabCase(name);
            h += `${kebabName}: ${span.style[name]};`;
          });
          h += '"';
        }
      }
      h += '>';

      h += span.text;

      h += '</span>';
    }
    return h;
  }
}