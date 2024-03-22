import { DocQ } from "./module/doc";
import { TextSegment } from "./module/paragraph";

import './global.css';

const originalData: {p: TextSegment[], disabled?: boolean}[] = [
  { p: [{ text: 'This is span 01.' }] },
  { p: [{ text: 'This is span 02.' }] },
  { p: [{ text: 'This is span 03.' }] },
];
const docQ = new DocQ({
  title: 'This is the title!',
  editable: true,
  data: originalData,
});

docQ.mountTo(document.getElementById('root'));
(window as any).docQ = docQ;

docQ.on('keydown', ({ context, event }) => {
  console.log(context, event.key);
});

