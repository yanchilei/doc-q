import { AtSegment, SegmentType } from "../../type/segment";

export const atRender = (segment: AtSegment) => {
  const { type, text, popup, link } = segment;
  if (type != SegmentType.At) {
    throw new Error(`Not at segment type: ${JSON.stringify(segment)}`);
  }
  const a = document.createElement('a');
  a.innerText = text;
  a.href = link;
  a.setAttribute('target', '_blank');
  return a;
}