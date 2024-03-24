import { camelCaseToKebabCase } from "../../../../utils/string";
import { TextSegment } from "../../../paragraph";

export function getHTMLFromTextSegments(textSegments: TextSegment[]) {
  let h = '';
  for (let i = 0; i < textSegments.length; i++) {
    const span = textSegments[i];
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