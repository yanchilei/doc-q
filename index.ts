import { DocQ } from "./module/doc";
import './global.css';

const htmlStr = `<span style='color: blue'>This is a span element.</span>`;
const docQ = new DocQ({
  title: 'This is the title!',
  titleDefaultStyle: {
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '16px',
    fontWeight: '700',
    fontSize: '24px',
    borderRadius: '16px',
  },
  htmlStrOrDescriptorList: [htmlStr, htmlStr],
});
docQ.mountTo(document.getElementById('root'));

setTimeout(() => {
  docQ.setEditable(true);
}, 3000);