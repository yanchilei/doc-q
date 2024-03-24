
import { DocQ } from "../doc";
import { EventEmitter } from "../event";
import { TextSegment } from "../paragraph";
import { BasicPluginType, BasicPlugin } from "../plugin";
import { initEvent } from "./event";
import { initElement, initPlugin } from "./init";

export interface BasicData {
  type: string;
  disabled?: boolean;
  content: (TextSegment)[];
}

export interface BlockParams {
  basicData: BasicData;
  defaultStyle?: Partial<CSSStyleDeclaration>;
  doc: DocQ;
}

export interface BlockEventParameterMap {
  'mouseenter': { block: Block };
  'mouseleave': { block: Block };
  'keydown': { block: Block; event: KeyboardEvent };
  'active': { block: Block };
  'inactive': { block: Block };
}

export class Block {
  constructor({
    basicData,
    defaultStyle,
    doc,
  }: BlockParams) {
    const { type, disabled, content } = basicData;
    const plugin = doc.plugins.find(plugin => plugin.type === type);
    if (!plugin) {
      throw new Error(`can not find plugin: ${type}`);
    }
    this.disabled = false;
    this.content = content;
    this.doc = doc;
    this.defaultStyle = defaultStyle;
    this.type = type;
    initPlugin(this, plugin);
    initElement(this, { disabled });

    initEvent(this, doc);
  }

  public disabled = false;
  public plugin: BasicPlugin = null;
  public setDisabled(disabled: boolean) {
    if (this.disabled === disabled) {
      return;
    }
    this.disabled = disabled;
    if (disabled) {
      this.el.style.userSelect = 'none';
      this.el.contentEditable = 'false';
    } else {
      this.el.style.userSelect = 'auto';
      this.el.contentEditable = 'true';
    }
  }

  public mountTo(root: HTMLElement) {
    root.appendChild(this.el);
    return this;
  }

  public el = document.createElement('div');
  public remove() {
    if (this.el) {
      this.el.remove();
    }
  }

  public content: BasicData['content'];
  public defaultStyle: Partial<CSSStyleDeclaration>;
  public type: BasicPluginType | string = BasicPluginType.TEXT;

  public eventEmitter: EventEmitter<BlockEventParameterMap> = new EventEmitter<BlockEventParameterMap>();
  public doc: DocQ = null;

  public selectedPosition: { type: 'full'| 'none' | 'part'; start?: number; end?: number } = { type: 'none' };

  public isActive = false;
  public setActive(active: boolean) {
    if (this.isActive === active) {
      return;
    }
    this.isActive = active;
    if (active) {
      this.eventEmitter.emit('active', { block: this });
    } else {
      this.eventEmitter.emit('inactive', { block: this });
    }
  }
}