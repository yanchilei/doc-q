import { Descriptor, StyleRange } from "..";

export function htmlStrToDescriptor(htmlStr: string): Descriptor {
  const des: Descriptor = Object.create(null);
  let plainText = 'This is a span';
  const styleLine: StyleRange[] = [
    {
      from: 0,
      to: 14,
      style: {
        color: 'red',
      }
    },
  ];
  for (let i = 0; i < htmlStr.length - 1; i++) {
    // TO DO 完整的html string解析状态机
    
  }

  des.plainText = plainText;
  des.styleLine = styleLine;
  return des;
}

export function descriptorToHtmlStr(descriptor: Descriptor): string {
  return `<span style='color:blue'>This is a span</span>`;
}