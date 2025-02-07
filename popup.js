let colorHistory = JSON.parse(localStorage.getItem('colorHistory') || '[]');
const colorNames = {
  'red': '#FF0000', 'blue': '#0000FF', 'green': '#00FF00', 'yellow': '#FFFF00',
  'purple': '#800080', 'orange': '#FFA500', 'pink': '#FFC0CB', 'brown': '#A52A2A',
  'gray': '#808080', 'black': '#000000', 'white': '#FFFFFF', 'cyan': '#00FFFF',
  'magenta': '#FF00FF', 'lime': '#00FF00', 'teal': '#008080', 'indigo': '#4B0082',
  'violet': '#EE82EE', 'maroon': '#800000', 'navy': '#000080', 'olive': '#808000'
};

document.addEventListener('DOMContentLoaded', () => {
  updateHistoryUI();
  setupTabs();
  setupColorSearch();

  // Initialize with the picker tab
  document.querySelector('[data-tab="picker"]').click();

  // Keyboard shortcut for color picking
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
      document.getElementById('pick-color-btn').click();
    }
  });
});

// Tab functionality
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // Update active tab button
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${targetTab}-tab`).classList.add('active');

      // Load site colors when switching to that tab
      if (targetTab === 'site-colors') {
        loadSiteColors();
      }
    });
  });
}

// Color picker functionality
document.getElementById('pick-color-btn').addEventListener('click', async () => {
  if (!window.EyeDropper) {
    alert('Your browser does not support the EyeDropper API.');
    return;
  }
  try {
    const picker = new EyeDropper();
    const result = await picker.open();
    const color = result.sRGBHex;
    updateColorInfo(color);
    addToHistory(color);
  } catch (err) {
    console.error('Color picking failed:', err);
  }
});

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', async (e) => {
    const format = e.target.dataset.format;
    const value = document.getElementById(`${format}-value`).textContent;
    try {
      await navigator.clipboard.writeText(value);
      const originalText = e.target.textContent;
      e.target.textContent = 'Copied!';
      e.target.style.backgroundColor = '#28a745';
      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.backgroundColor = '';
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });
});

// Site colors functionality
async function loadSiteColors() {
  const grid = document.getElementById('site-colors-grid');
  grid.innerHTML = '<div class="loading"><span class="spinner"></span> Analyzing page colors...</div>';
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const colors = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractPageColors
    });
    displaySiteColors(colors[0].result);
  } catch (err) {
    grid.innerHTML = '<div class="loading">Failed to load site colors</div>';
    console.error('Failed to load site colors:', err);
  }
}

function extractPageColors() {
  const colors = new Set();
  const elements = document.querySelectorAll('*');
  elements.forEach(element => {
    const styles = window.getComputedStyle(element);
    const backgroundColor = styles.backgroundColor;
    const color = styles.color;
    if (backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
      colors.add(backgroundColor);
    }
    if (color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
      colors.add(color);
    }
  });
  return Array.from(colors);
}

function displaySiteColors(colors) {
  const grid = document.getElementById('site-colors-grid');
  grid.innerHTML = '';
  colors.forEach(color => {
    const item = document.createElement('div');
    item.className = 'site-color-item';
    item.style.backgroundColor = color;
    item.title = color;
    const tooltip = document.createElement('div');
    tooltip.className = 'color-tooltip';
    tooltip.textContent = color;
    item.appendChild(tooltip);
    item.addEventListener('click', () => {
      updateColorInfo(color);
      addToHistory(color);
    });
    grid.appendChild(item);
  });
}

// Color search functionality
function setupColorSearch() {
  const searchInput = document.getElementById('color-search');
  const suggestionsContainer = document.getElementById('color-suggestions');
  let debounceTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const query = e.target.value.toLowerCase();
      const suggestions = [];
      for (const [name, hex] of Object.entries(colorNames)) {
        if (name.includes(query) || hex.toLowerCase().includes(query)) {
          suggestions.push({ name, hex });
        }
      }
      displayColorSuggestions(suggestions);
    }, 300);
  });
}

function displayColorSuggestions(suggestions) {
  const container = document.getElementById('color-suggestions');
  container.innerHTML = '';
  suggestions.forEach(({ name, hex }) => {
    const suggestion = document.createElement('div');
    suggestion.className = 'color-suggestion';
    const preview = document.createElement('div');
    preview.className = 'color-preview';
    preview.style.backgroundColor = hex;
    const colorName = document.createElement('div');
    colorName.className = 'color-name';
    colorName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    const colorCodes = document.createElement('div');
    colorCodes.className = 'color-codes';
    const hexCode = document.createElement('p');
    hexCode.textContent = `HEX: ${hex}`;
    const rgb = hexToRgb(hex);
    const rgbCode = document.createElement('p');
    rgbCode.textContent = `RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const rgbaCode = document.createElement('p');
    rgbaCode.textContent = `RGBA: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
    colorCodes.appendChild(hexCode);
    colorCodes.appendChild(rgbCode);
    colorCodes.appendChild(rgbaCode);
    suggestion.appendChild(preview);
    suggestion.appendChild(colorName);
    suggestion.appendChild(colorCodes);
    suggestion.addEventListener('click', () => {
      updateColorInfo(hex);
      addToHistory(hex);
    });
    container.appendChild(suggestion);
  });
}

// Color info and history functionality
function updateColorInfo(color) {
  const colorPreview = document.getElementById('color-preview');
  const hexValue = document.getElementById('hex-value');
  const rgbValue = document.getElementById('rgb-value');
  const hslValue = document.getElementById('hsl-value');
  colorPreview.style.backgroundColor = color;
  hexValue.textContent = color;
  const rgb = hexToRgb(color);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  rgbValue.textContent = rgbString;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hslString = `hsl(${Math.round(hsl.h)}°, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
  hslValue.textContent = hslString;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
}

function addToHistory(color) {
  if (!colorHistory.includes(color)) {
    colorHistory.unshift(color);
    if (colorHistory.length > 10) {
      colorHistory.pop();
    }
    localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
    updateHistoryUI();
  }
}

function updateHistoryUI() {
  const historyContainer = document.getElementById('color-history');
  historyContainer.innerHTML = '';
  colorHistory.forEach(color => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.style.backgroundColor = color;
    item.title = color;
    item.addEventListener('click', () => {
      updateColorInfo(color);
    });
    historyContainer.appendChild(item);
  });
}