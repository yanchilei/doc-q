import { BasicData, Block } from "../block";
import { EventEmitter } from "../event";
import { PluginMenu } from "../menu";
import { BasicPlugin } from "../plugin";
import { Context } from "./context";
import { init } from "./init.ts";

export type Data = BasicData[];

export interface DocQParams { 
  title?: string,
  editable?: boolean,
  data?: Data,
  containerDefaultStyle?: Partial<CSSStyleDeclaration>,
  titleDefaultStyle?: Partial<CSSStyleDeclaration>,
  blockContainerDefaultStyle?: Partial<CSSStyleDeclaration>,
  blockDefaultStyle?: Partial<CSSStyleDeclaration>,
}

export interface DocEventParameterMap {
  'click': { block: Block, context: Context };
  'mouseover': { block: Block, context: Context };
  'keydown': { context: Context, event: KeyboardEvent };
  'keyup': { context: Context, event: KeyboardEvent };
  'editablechange': { editable: boolean, context: Context };
  'selectionchange': { selection: Selection, context: Context };
  'pluginMenuShow': { pluginMenu: PluginMenu, context: Context };
  'pluginMenuHide': { pluginMenu: PluginMenu, context: Context };
}


export class DocQ {
  public params: DocQParams;
  public editable = false;
  public title: Block;
  public model: Block[] = [];
  public root: HTMLElement = null;
  public container = document.createElement('div');
  public blockContainer = document.createElement('div');
  public eventEmitter = new EventEmitter<DocEventParameterMap>();
  public context: Context;
  public pluginMenu: PluginMenu;

  constructor(params: DocQParams) {
    this.params = params;
  }
  public setEditable(editable: boolean) {
    if (this.editable == editable) {
      return this;
    }
    this.editable = editable;
    this.container.contentEditable = editable.toString();
    this.eventEmitter.emit('editablechange', { editable, context: this.context });
    return this;
  }

  public mountTo(root: HTMLElement, callback?: (doc: DocQ) => void) {
    init(this, this.params);
    this.root = root;
    root.appendChild(this.container);
    callback?.(this);
  }

  public on<T extends keyof DocEventParameterMap>(eventName: T, callback: (payload: DocEventParameterMap[T]) => void) {
    this.eventEmitter.on(eventName, callback);
    return this;
  }

  public plugins: BasicPlugin[] = [];
  public use(plugin: BasicPlugin) {
    if (this.plugins.includes(plugin)) {
      console.warn('plugin already exists: ', plugin.type);
      return this;
    }
    this.plugins.push(plugin);
    return this;
  }
}