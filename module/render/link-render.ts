import { LinkRender } from "../../type/render";
import { LinkSegment, SegmentType } from "../../type/segment";

export const linkRender: LinkRender = (segment: LinkSegment) => {
  const { type, text, link } = segment;
  if (type != SegmentType.Link) {
    throw new Error(`Not link segment type: ${JSON.stringify(segment)}`);
  }
  const a = document.createElement('a');
  a.innerText = text;
  a.href = link;
  a.setAttribute('target', '_blank');
  return a;
}