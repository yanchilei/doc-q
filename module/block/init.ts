import { Block } from ".";
import { BasicPlugin } from "../plugin";

export function initPlugin(block: Block, plugin: BasicPlugin) {
  if (!plugin.render) {
    throw new Error(`plugin: ${block.plugin.type} has no render function`);
  }
  block.plugin = plugin;
}

export function initContent(block: Block, payload: { disabled?: boolean } = {}) {
  const { disabled } = payload;
  block.contentContainer.style.margin = '8px 0';
  block.contentContainer.style.fontSize = '14px';
  block.contentContainer.style.minHeight = '14px';
  block.setDisabled(!!disabled);


  if (block.defaultStyle) {
    Object.keys(block.defaultStyle).forEach(name => {
      block.contentContainer.style[name] = block.defaultStyle[name];
    });
  }
  block.contentContainer.innerHTML = block.plugin.render(block.content);
  block.container.appendChild(block.contentContainer);
}

export function initCapitalMenu(block: Block) {
  const cap = block.capitalMenuContainer = document.createElement('div');
  cap.contentEditable = 'false';
  cap.style.display = 'none';
  cap.style.position = 'absolute';
  cap.style.userSelect = 'none';
  cap.style.top = '0';
  cap.style.left = '0';
  cap.style.width = '50px';
  cap.style.height = '20px';
  cap.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  cap.style.fontSize = '12px';
  cap.style.justifyContent = 'center';
  cap.style.alignItems = 'center';
  cap.style.cursor = 'pointer';
  cap.classList.add('capital-menu-container');
  cap.innerHTML = '<div class="capital-menu">Capital</div>';
  block.container.appendChild(cap);
}

export function initContainer(block: Block) {
  const container = block.container;
  container.style.position = 'relative';
  container.style.paddingLeft = '64px';
}