import { AtSegment, CanvasSegment, ImageSegment, LinkSegment, Segment, SegmentType, TextSegment } from "../../type/segment";
import { atRender } from "./at-render";
import { canvasRender } from "./canvas-render";
import { imageRender } from "./image-render";
import { linkRender } from "./link-render";
import { textRender } from "./text-render";

export const segmentRender = (segment: Segment) => {
  switch (segment.type) {
    case SegmentType.Text:
      return textRender(segment as TextSegment);
    case SegmentType.Link:
      return linkRender(segment as LinkSegment);
    case SegmentType.At:
      return atRender(segment as AtSegment);
    case SegmentType.Image:
      return imageRender(segment as ImageSegment);
    case SegmentType.Canvas:
      return canvasRender(segment as CanvasSegment);
    default:
      throw new Error(`Not supported segment type: ${JSON.stringify(segment)}`);
  }
}
