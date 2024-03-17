import { AtSegment, CanvasSegment, ImageSegment, LinkSegment, Segment, TextSegment } from "./segment"

export type TextRender = (segment: TextSegment) => HTMLSpanElement;
export type LinkRender = (segment: LinkSegment) => HTMLAnchorElement;
export type AtRender = (segment: AtSegment) => HTMLSpanElement;
export type ImageRender = (segment: ImageSegment) => HTMLImageElement;
export type CanvasRender = (segment: CanvasSegment) => HTMLCanvasElement;