import { TextRender } from "../../type/render";
import { SegmentType, TextSegment } from "../../type/segment";

export const textRender: TextRender = (segment: TextSegment) => {
  const { type, text } = segment;
  if (type != SegmentType.Text) {
    throw new Error(`Not text segment type: ${JSON.stringify(segment)}`);
  }
  const span = document.createElement('span');
  span.innerText = text;
  return span;
}