export default function asyncLoadJs(url) {
  return new Promise((resolve, reject) => {
    const hasLoaded = document.querySelector(`script[src="${url}"]`);
    if (hasLoaded) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
  });
}
