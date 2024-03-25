import { DocQ } from "../doc";

export class PluginMenu {
  constructor({
    doc
  }: {
    doc: DocQ
  }) {
    this.doc = doc;
    this.generateMenu();
  }
  public doc: DocQ;

  public el = document.createElement('div');

  public isShow = false;

  public generateMenu() {
    if (!this.doc.plugins || this.doc.plugins.length === 0) {
      return;
    }

    const style = this.el.style;
    this.el.contentEditable = 'false';
    this.el.onclick = e => {
      e.stopPropagation();
    }
    style.position = 'absolute';
    style.left = '64px';
    style.top = '0';
    style.zIndex = '1';
    style.background = '#ffffff';
    style.display = 'none';
    style.userSelect = 'none';
    style.width = '300px';
    style.height = '500px';
    style.boxShadow = '1px 1px 2px 2px rgba(0, 0, 0, 0.2)';
    style.borderRadius = '8px';
    style.padding = '4px';

    this.doc.plugins.forEach(plugin => {
      const { type } = plugin;
      const div = document.createElement('div');
      div.innerHTML = type;
      div.style.height = '48px';
      div.style.marginBottom = '4px';
      div.style.cursor = 'pointer';
      div.style.padding = '0 8px';
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.borderRadius = '4px';
      div.onmouseenter = () => {
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      };
      div.onmouseleave = () => {
        div.style.backgroundColor = 'transparent';
      }
      div.onclick = () => {
        console.log('plugin click: ', plugin);
        this.hide();
      }
      this.el.appendChild(div);
    });
  }

  public show() {
    const { context } = this.doc;
    const { currentSelectPosition: { selectedBlocks, start } } = context;
    if (start === 0) {
      const block = selectedBlocks[0];
      const { top: blockTop, height } = block.container.getBoundingClientRect();
      const { top: blockContainerTop } = this.doc.blockContainer.getBoundingClientRect();
      const topOffset = 16;
      this.el.style.top = `${blockTop - blockContainerTop + height + topOffset}px`;
      this.el.style.display = 'block';
      this.isShow = true;
      this.doc.eventEmitter.emit('pluginMenuShow', { pluginMenu: this, context });
    }
  }

  public hide() {
    this.el.style.display = 'none';
    this.isShow = false;
    this.doc.eventEmitter.emit('pluginMenuHide', { pluginMenu: this, context: this.doc.context });
  }
}