import { DocQ } from "..";

export function initKeyboardEventListener(doc: DocQ) {
  doc.container.addEventListener('keydown', e => {
    e.preventDefault();
    const { context } = doc;
    keydownPluginDispatch(doc, e);
    if (e.key === '/') {
      doc.pluginMenu.show();
    }
    doc.eventEmitter.emit('keydown', { context, event: e });
  });

  doc.container.addEventListener('keyup', e => {
    e.preventDefault();
    const { context } = doc;
    doc.eventEmitter.emit('keyup', { context, event: e });
  })
}

function keydownPluginDispatch( doc: DocQ, e: KeyboardEvent ) {
  for (let i = 0; i < doc.model.length; i++) {
    const block = doc.model[i];
    block.eventEmitter.emit('keydown', { block, event: e });
  }
}