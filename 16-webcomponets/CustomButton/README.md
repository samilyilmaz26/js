# Custom Button Web Component

A reusable custom web component for creating parametric buttons with customizable styling.

## Features

- **Parametric Styling**: Customize color, background-color, text, font-family, and font-size
- **Event Handling**: Built-in click events with custom event dispatching
- **Accessibility**: Proper focus states and keyboard navigation
- **Responsive Design**: Hover and active states with smooth transitions
- **Programmatic Control**: Methods to dynamically change button properties

## Usage

### Basic Usage

```html
<custom-button text="Click Me!"></custom-button>
```

### With Custom Styling

```html
<custom-button 
    text="Custom Button" 
    color="white" 
    background-color="#007bff" 
    font-family="Arial, sans-serif" 
    font-size="16px">
</custom-button>
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | "Button" | The text displayed on the button |
| `color` | string | "#333" | Text color (CSS color value) |
| `background-color` | string | "#f8f9fa" | Background color (CSS color value) |
| `font-family` | string | "Arial, sans-serif" | Font family (CSS font-family value) |
| `font-size` | string | "14px" | Font size (CSS font-size value) |

## Examples

### Color Variations
```html
<custom-button text="Primary" color="white" background-color="#007bff"></custom-button>
<custom-button text="Success" color="white" background-color="#28a745"></custom-button>
<custom-button text="Warning" color="black" background-color="#ffc107"></custom-button>
<custom-button text="Danger" color="white" background-color="#dc3545"></custom-button>
```

### Font Styling
```html
<custom-button text="Arial Font" font-family="Arial, sans-serif"></custom-button>
<custom-button text="Times Font" font-family="Times New Roman, serif"></custom-button>
<custom-button text="Monospace" font-family="Courier New, monospace"></custom-button>
<custom-button text="Large Text" font-size="18px"></custom-button>
```

## Event Handling

The component dispatches a custom `button-click` event when clicked:

```javascript
document.addEventListener('button-click', function(e) {
    console.log('Button clicked:', e.detail);
    // e.detail contains: { text: "Button Text", timestamp: "2024-01-01T12:00:00.000Z" }
});
```

## Programmatic Control

You can control the button programmatically using these methods:

```javascript
const button = document.querySelector('custom-button');

// Change properties
button.setText('New Text');
button.setColor('#ff0000');
button.setBackgroundColor('#000000');
button.setFontFamily('Georgia, serif');
button.setFontSize('20px');

// Enable/disable
button.disable();
button.enable();
```

## Browser Support

This component uses modern web standards and requires:
- Custom Elements v1
- Shadow DOM v1
- ES6 Classes

Supported in all modern browsers (Chrome 54+, Firefox 63+, Safari 10.1+, Edge 79+).

## File Structure

```
CustomButton/
├── index.html          # Demo page with examples
├── custom-button.js    # The custom button component
└── README.md          # This documentation
```

## Getting Started

1. Include the component script in your HTML:
```html
<script src="custom-button.js"></script>
```

2. Use the custom button in your HTML:
```html
<custom-button text="Hello World!" color="white" background-color="#007bff"></custom-button>
```

3. Open `index.html` in a web browser to see the demo with various examples.
