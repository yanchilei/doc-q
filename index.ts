import { Data, DocQ } from "./module/doc";
import { BasicPluginType } from "./module/plugin";
import { TextPlugin } from "./module/plugin/text";

import './global.css';

const data: Data = [
  { content: [{ text: 'This is span 01.' }], type: BasicPluginType.TEXT },
  { content: [{ text: 'This is span 02.' }], type: BasicPluginType.TEXT, disabled: true },
  { content: [{ text: 'This is span 03.' }], type: BasicPluginType.TEXT },
];

// const data = [];
new DocQ({
  title: 'This is title',
  editable: true,
  data,
})
  .use(new TextPlugin())
  // .on('keydown', ({ context, event }) => {
  //   console.log(context, event.key);
  // })
  // .on('mouseover', ({ block, context }) => {
  //   console.log(block, context);
  // })
  // .on('click', ({ block, context }) => {
  //   console.log(block, context);
  // })
  .mountTo(
    document.getElementById('root'),
    doc => {
      (window as any).docQ = doc;
    }
  );

