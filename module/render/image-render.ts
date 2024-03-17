import { ImageRender } from "../../type/render";
import { ImageSegment, SegmentType } from "../../type/segment";

export const imageRender: ImageRender = (segment: ImageSegment) => {
  const { type, text, src } = segment;
  if (type != SegmentType.Image) {
    throw new Error(`Not image segment type: ${JSON.stringify(segment)}`);
  }
  const img = document.createElement('img');
  img.src = src;
  img.alt = text;
  return img;
}