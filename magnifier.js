const magnifier = document.getElementById('magnifier');
const ctx = magnifier.getContext('2d');

document.addEventListener('mousemove', (e) => {
  const img = new Image();
  img.src = captureScreen(); // Capture screen (requires permissions)
  ctx.drawImage(img, e.clientX - 5, e.clientY - 5, 10, 10, 0, 0, 100, 100); // Zoomed view
});