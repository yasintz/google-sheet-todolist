function fallbackCopyTextToClipboard(text: string) {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.visibility = 'hidden';
    textArea.style.opacity = '0';
    textArea.style.height = '0px';
    textArea.style.width = '0px';
    textArea.style.pointerEvents = 'none';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        resolve();
        return;
      }
      reject();
    } catch (err) {
      reject(err);
    }
  });
}

export default function copyTextToClipboard(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }

  return fallbackCopyTextToClipboard(text);
}
