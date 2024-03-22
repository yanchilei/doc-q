import { Block } from "../../block"

interface Select {
  blocks: Block[];
  start: number;
  end: number;
}

export class Context {
  public currentSelection: { selectedBlocks: Block[], start: number, end: number } = null;
  public currentHoveredBlock: Block = null;

  public blocks: Block[] = null;
}