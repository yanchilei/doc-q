import { DocQ } from "./module/doc";
import { Segment, SegmentType } from "./type/segment";
import './global.css';

const model: { title: string; content: Segment[] } = { title: 'This is a title', content: [{ type: SegmentType.Text, text: 'This is a content' }] };
const docQ = new DocQ({ el: document.getElementById('root') });
docQ.init(model, document.getElementById('root'));