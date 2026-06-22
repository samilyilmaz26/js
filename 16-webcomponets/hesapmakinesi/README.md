# Calculator Web Component

A modern, reusable calculator web component built with vanilla JavaScript and Web Components API.

## Features

- **Web Component Architecture**: Built using Custom Elements and Shadow DOM
- **Encapsulated Styles**: CSS is scoped within the component using Shadow DOM
- **Reusable**: Can be used multiple times on the same page
- **Responsive Design**: Works on desktop and mobile devices
- **No Dependencies**: Pure vanilla JavaScript, no external libraries required

## Usage

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Calculator App</title>
</head>
<body>
    <!-- Use the calculator component -->
    <calculator-component></calculator-component>
    
    <!-- Import the component -->
    <script type="module" src="calculator-component.js"></script>
</body>
</html>
```

### Multiple Instances

You can use multiple calculator instances on the same page:

```html
<calculator-component></calculator-component>
<calculator-component></calculator-component>
<calculator-component></calculator-component>
```

## API

The calculator component provides the following operations:

- **Addition (+)**: Adds two numbers
- **Subtraction (-)**: Subtracts the second number from the first
- **Multiplication (×)**: Multiplies two numbers
- **Division (÷)**: Divides the first number by the second (with zero-division protection)

## Browser Support

This web component uses modern web standards:

- Custom Elements API
- Shadow DOM
- ES6 Classes
- Template Literals

**Minimum browser requirements:**
- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## File Structure

```
calculator-component/
├── calculator-component.js    # Main web component file
├── demo.html                 # Demo page showing usage
├── README.md                 # This documentation
├── index.html                # Original HTML (legacy)
├── app.js                    # Original JavaScript (legacy)
├── style.css                 # Original CSS (legacy)
├── base.js                   # Original utility functions (legacy)
└── util.js                   # Original utility functions (legacy)
```

## Development

### Running the Demo

1. Open `demo.html` in a modern web browser
2. The demo shows both single and multiple calculator instances
3. Each calculator operates independently

### Customization

The component can be customized by modifying the CSS within the Shadow DOM in `calculator-component.js`. The styles are encapsulated, so they won't affect other parts of your page.

## Migration from Original

The original calculator has been converted to a web component with the following improvements:

1. **Encapsulation**: Styles and behavior are contained within the component
2. **Reusability**: Can be instantiated multiple times
3. **Modern Standards**: Uses Web Components API
4. **Better Organization**: Single file contains all component logic
5. **Event Management**: Proper event listener cleanup

## License

This project is open source and available under the MIT License.
