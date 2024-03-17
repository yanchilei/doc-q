import { CanvasRender } from "../../type/render";
import { CanvasSegment, SegmentType } from "../../type/segment";

export const canvasRender: CanvasRender = (segment: CanvasSegment) => {
  const { type, text, content } = segment;
  if (type != SegmentType.Canvas) {
    throw new Error(`Not canvas segment type: ${JSON.stringify(segment)}`);
  }
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2d context');
  }
  return canvas;
}