export enum SegmentType {
  Text = 0,
  Link = 1,
  At = 2,
  Image = 3,
  Canvas = 4,
}

export type TextSegment = { type: SegmentType.Text; text: string }
export type LinkSegment = { type: SegmentType.Link; text: string; link: string }
export type AtSegment = { type: SegmentType.At; text: string; popup: string; link: string }
export type ImageSegment = { type: SegmentType.Image; text: string; src: string }
export type CanvasSegment = { type: SegmentType.Canvas; text: string; content: string }

export type Segment = TextSegment | LinkSegment | AtSegment | ImageSegment | CanvasSegment;