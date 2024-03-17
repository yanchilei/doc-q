export const cursorRender = (position: { left: number; top: number }) => {
  const { left, top } = position;
  const cursor = document.createElement('div');
  cursor.style.position = 'absolute';
  cursor.style.left = left + 'px';
  cursor.style.top = top + 'px';
  cursor.style.animation = 'cursor 1s infinite step-start';
  cursor.style.background = 'black';
  cursor.style.width = '2px';
  cursor.style.height = '20px';
  cursor.style.borderRadius = '1px';
  cursor.style.zIndex = '9999';
  return cursor;
}