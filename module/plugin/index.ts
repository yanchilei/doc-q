import { BasicData, Block } from "../block";
import { Context } from "../doc/context";
import { TextSegment } from "../paragraph";

export enum BasicPluginType {
  TEXT = 'text',
}

export abstract class BasicPlugin {

  public type: string;
  public category: string;

  public render: (basicData: (TextSegment[])) => string;
  public modify: (block: Block, operator: string) => void;

  public onMouseEnter: (payload: { block: Block, context: Context }) => void;
  public onMouseLeave: (payload: { block: Block, context: Context }) => void;
  public onKeyDown: (payload: { block: Block; event: KeyboardEvent }) => void;
  public onActive: (payload: { block: Block }) => void;
  public onInactive: (payload: { block: Block }) => void;
}