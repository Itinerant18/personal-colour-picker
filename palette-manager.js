let palettes = JSON.parse(localStorage.getItem('palettes') || '{}');

function savePalette(name, colors) {
  palettes[name] = colors;
  localStorage.setItem('palettes', JSON.stringify(palettes));
}

function exportPalette(name) {
  const json = JSON.stringify(palettes[name]);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.json`;
  a.click();
}