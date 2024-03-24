import { Block } from "../../block"

export class Context {
  public currentSelectPosition: { selectedBlocks: Block[], start: number, end: number } = null;
  public currentHoveredBlock: Block = null;
  public currentClickedBlock: Block = null;

  public blocks: Block[] = null;
}