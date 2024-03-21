import { DocQ } from "./module/doc";
import { TextSegment } from "./module/text-segment";

import './global.css';

const originalData: TextSegment[][] = [
  [{ text: 'This is span 01.', style: { color: 'red' } }],
  [{ text: 'This is span 02.', style: { color: 'green' } }],
  [{ text: 'This is span 03.', style: { color: 'blue' } }],
];
const docQ = new DocQ({
  title: 'This is the title!',
  editable: true,
  data: originalData,
});

docQ.mountTo(document.getElementById('root'));
(window as any).docQ = docQ;
docQ.on('keydown', (doc, e) => {
  console.log(doc, e);
})