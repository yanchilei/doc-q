// 获取选定的HTML元素
export function getSelectedElements() {
  var selectedElements = [];
  
  // 获取Selection对象
  var selection = window.getSelection();
  
  // 遍历Selection中的所有Range对象
  for (var i = 0; i < selection.rangeCount; i++) {
    var range = selection.getRangeAt(i);
    
    // 创建一个临时的div元素，将选定的内容插入其中
    var tempDiv = document.createElement('div');
    tempDiv.appendChild(range.cloneContents());
    
    // 遍历临时div中的所有子元素，将其添加到选定的元素数组中
    var childNodes = tempDiv.childNodes;
    for (var j = 0; j < childNodes.length; j++) {
      selectedElements.push(childNodes[j]);
    }
  }
  
  return selectedElements;
}