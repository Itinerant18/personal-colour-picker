chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'extractPageColors') {
      const colors = extractPageColors();
      sendResponse(colors);
    }
  });
  
  // Function to extract background and text colors from a specific element
  function extractElementColors(selector) {
    try {
      const element = document.querySelector(selector);
      if (!element) {
        return { error: 'Element not found' };
      }
      const styles = window.getComputedStyle(element);
      return {
        background: styles.backgroundColor,
        text: styles.color,
      };
    } catch (err) {
      console.error('Error extracting element colors:', err);
      return { error: err.message };
    }
  }
  // Function to extract gradient or background image from a specific element
  function extractGradient(selector) {
    try {
      const element = document.querySelector(selector);
      if (!element) {
        return { error: 'Element not found' };
      }
      const styles = window.getComputedStyle(element);
      const backgroundImage = styles.backgroundImage;
      return {
        backgroundImage: backgroundImage !== 'none' ? backgroundImage : 'No gradient or image',
      };
    } catch (err) {
      console.error('Error extracting gradient:', err);
      return { error: err.message };
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