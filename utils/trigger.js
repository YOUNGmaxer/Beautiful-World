// 手动触发事件
export default function trigger(eventName) {
  const e = document.createEvent('Event');
  e.initEvent(eventName, true, true);
  window.dispatchEvent(e);
}
