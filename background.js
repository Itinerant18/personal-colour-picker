// Message types
const MessageTypes = {
    COLOR_PICKED: 'colorPicked',
    COLOR_HOVER: 'colorHover',
    SITE_COLORS: 'siteColors'
  };
  
  // Store the currently picked color
  let currentColor = '#FFFFFF'; // Default color
  
  // Listen for messages from content scripts
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message);
  
    // Update the current color if a color is picked
    if (message.type === MessageTypes.COLOR_PICKED) {
      currentColor = message.color;
    }
  
    // Forward messages to the popup if it's open
    chrome.runtime.sendMessage(message).catch(() => {
      // Popup is not open, ignore the error
    });
  });
  
  // Handle external API requests
  chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (!sender || !sender.url.startsWith('https://trusted-domain.com')) {
      console.warn('Unauthorized external request:', sender);
      return;
    }
  
    if (message.action === 'getColor') {
      sendResponse({ color: currentColor });
    }
  });