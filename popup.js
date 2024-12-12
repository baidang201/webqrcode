document.addEventListener('DOMContentLoaded', async () => {
  // Get current tab URL and title
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;
  const title = tab.title;

  // Set website title
  document.getElementById('title').textContent = title;

  // Set favicon
  const favicon = document.getElementById('favicon');
  favicon.src = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;

  // Generate QR code
  new QRCode(document.getElementById('qrcode'), {
    text: url,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}); 