# Modern Color Picker Chrome Extension

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

The **Modern Color Picker** is a powerful Chrome extension that allows users to pick colors from web pages, images, videos, and even their entire screen. It provides advanced functionality such as color history, contrast checking, gradient detection, and more.

---

## Features

### Core Features
- **Color Picking**: Use the Eye Dropper API to pick colors from any part of the screen.
- **Live Preview**: Displays a real-time preview of the selected color.
- **Multiple Formats**: Automatically displays HEX, RGB, HSL, and CMYK values.
- **Copy to Clipboard**: Easily copy color codes in various formats with a single click.
- **Keyboard Shortcut**: Use `Ctrl + P` to activate the color picker tool.

### Advanced Features
- **Site Colors**: Analyze and extract colors used on a webpage.
- **Search Colors**: Search for predefined or custom colors by name or HEX code.
- **Color History**: View and reuse recently picked colors.
- **Contrast Checker**: Calculate the contrast ratio between two colors for accessibility compliance.
- **Gradient Detection**: Extract gradients and background colors used on a webpage.
- **Image Color Extraction**: Upload an image to extract dominant colors.

---

## Installation

### Prerequisites
- A modern browser that supports the **EyeDropper API** (e.g., Google Chrome 94+).
- Basic knowledge of installing Chrome extensions.

### Steps to Install
1. **Clone the Repository**
   Clone this repository to your local machine using the following command:
   ```bash
   git clone https://github.com/Itinerant18/personal-colour-picker.git
   ```

2. **Load the Extension into Chrome**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** (toggle switch in the top-right corner).
   - Click **Load unpacked** and select the folder containing the cloned repository.

3. **Verify Installation**
   - The extension should now appear in your list of installed extensions.
   - Click the extension icon in the Chrome toolbar to open the popup.

---

## Usage

### Picking Colors
1. Open the extension popup.
2. Click the **Pick Color** button or press `Ctrl + P` to activate the color picker.
3. Hover over any part of the screen to select a color.
4. The selected color will be displayed in the popup with its HEX, RGB, and HSL values.

### Site Colors
1. Switch to the **Site Colors** tab in the popup.
2. The extension will analyze the current webpage and display a grid of colors used on the page.
3. Click on any color to view its details or add it to your history.

### Searching Colors
1. Switch to the **Search** tab in the popup.
2. Type a color name (e.g., "red") or HEX code (e.g., "#FF0000") in the search bar.
3. The extension will display matching colors with previews and codes.

### Color History
1. Recently picked colors are stored in the **History** section.
2. Click on any color in the history to reuse it.

---

## Development

### Project Structure
```
modern-color-picker-extension/
├── popup.html       # Main popup UI
├── popup.js         # Logic for the popup
├── content.js       # Script for interacting with web pages
├── background.js    # Background script for handling messages
├── styles.css       # Styles for the popup and other components
├── manifest.json    # Chrome extension manifest file
├── icons/           # Icons for the extension
└── README.md        # This file
```

### Building and Testing
1. Make changes to the files as needed.
2. Reload the extension in `chrome://extensions/` to apply the changes.
3. Test the extension thoroughly to ensure all features work as expected.

---

## Contributing

Contributions are welcome! If you'd like to contribute to this project, follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature or fix"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Thanks to the developers of the **EyeDropper API** for enabling advanced color-picking functionality.
- Inspired by popular color picker tools like **ColorZilla** and **Chrome DevTools**.

---

## Contact

For questions or feedback, feel free to reach out:
- GitHub: [@Itinerant18](https://github.com/Itinerant18)
- Email: [your-email@example.com]
