import { BasicPlugin, BasicPluginType } from "..";
import { Block } from "../../block";
import { Context } from "../../doc/context";
import { TextSegment } from "../../paragraph";
import { getHTMLFromTextSegments } from "./render";

export class TextPlugin extends BasicPlugin {
  public type = BasicPluginType.TEXT;
  public category = 'basic';

  public render = (textSegments: TextSegment[]) => {
    return getHTMLFromTextSegments(textSegments);
  }

  public modify = (block: Block, operator: string) => {
    console.log('[text plugin] modify: ', block, operator);
  };

  public onMouseEnter = (payload: { block: Block, context: Context }) => {
    const { block, context } = payload;
    // console.log('[text plugin] mouse enter: ', block, context);
  };

  public onMouseLeave = (payload: { block: Block; context: Context; }) => {
    const { block, context } = payload;
    // console.log('[text plugin] mouse leave: ', block, context);
  };

  public onKeyDown = (payload: { block: Block; event: KeyboardEvent; }) => {
    const { block, event } = payload;
    console.log('[text plugin] key down: ', block, event);
  };

  public onActive = (payload: { block: Block; }) => {
    const { block } = payload;
    // console.log('[text plugin] active: ', block);
  };

  public onInactive = (payload: { block: Block; }) => {
    const { block } = payload;
    // console.log('[text plugin] inactive: ', block);
  };
}