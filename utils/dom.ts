export function getClosestCharPosition(NodeList: Node[], clientX: number, clientY: number): { char: string, rect: { left: number; top: number; height: number } } {
  const textNodeList = Array.prototype.filter.call(NodeList, (node) => {
    return node.nodeType == Node.TEXT_NODE;
  });
  for (let i = 0; i < textNodeList.length; i++) {
    const textNode = textNodeList[i];
    const range = new Range();
    range.selectNodeContents(textNode);
    const text = range.toString();
    let rect: DOMRect;
    for (let j = 0; j < text.length; j++) {
      range.setStart(textNode, j);
      range.setEnd(textNode, j + 1);
      rect = range.getBoundingClientRect();
      if (
        rect.left <= clientX && 
        clientX <= rect.right &&
        rect.top <= clientY &&
        clientY <= rect.bottom
      ) {
        const deltaLeft = clientX - rect.left;
        const deltaRight = rect.right - clientX;
        if (deltaLeft < deltaRight) {
          return {
            char: text[j],
            rect: {
              left: rect.left,
              top: rect.top,
              height: rect.height,
            }
          }
        } else {
          if (j === text.length - 1) {
            return {
              char: text[j],
              rect: {
                top: rect.top,
                height: rect.height,
                left: rect.right,
              },
            }
          }
          return {
            char: text[j + 1],
            rect: {
              top: rect.top,
              height: rect.height,
              left: rect.right,
            },
          }
        }
      }
    }
  }
  return {
    char: '',
    rect: null,
  }
}