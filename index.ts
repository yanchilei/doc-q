import { DocQ } from "./module/doc";
import { TextSegment } from "./module/paragraph";

import './global.css';

const originalData: {textSegmentList: TextSegment[], disabled?: boolean}[] = [
  { textSegmentList: [{ text: 'This is span 01.' }] },
  { textSegmentList: [{ text: 'This is span 02.' }], disabled: true },
  { textSegmentList: [{ text: 'This is span 03.' }] },
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