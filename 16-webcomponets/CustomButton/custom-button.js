class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['text', 'color', 'background-color', 'font-family', 'font-size'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        // Get attribute values with defaults
        const text = this.getAttribute('text') || 'Button';
        const color = this.getAttribute('color') || '#333';
        const backgroundColor = this.getAttribute('background-color') || '#f8f9fa';
        const fontFamily = this.getAttribute('font-family') || 'Arial, sans-serif';
        const fontSize = this.getAttribute('font-size') || '14px';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }
                
                .custom-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    outline: none;
                    user-select: none;
                }
                
                .custom-button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                }
                
                .custom-button:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .custom-button:focus {
                    box-shadow: 0 0 0 3px rgba(0,123,255,0.25);
                }
                
                .custom-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }
            </style>
            <button class="custom-button" 
                    style="color: ${color}; 
                           background-color: ${backgroundColor}; 
                           font-family: ${fontFamily}; 
                           font-size: ${fontSize};">
                ${text}
            </button>
        `;

        // Add click event listener
        const button = this.shadowRoot.querySelector('.custom-button');
        button.addEventListener('click', (e) => {
            // Dispatch custom event
            this.dispatchEvent(new CustomEvent('button-click', {
                detail: {
                    text: text,
                    timestamp: new Date().toISOString()
                },
                bubbles: true
            }));
        });
    }

    // Public methods for programmatic control
    setText(newText) {
        this.setAttribute('text', newText);
    }

    setColor(newColor) {
        this.setAttribute('color', newColor);
    }

    setBackgroundColor(newBackgroundColor) {
        this.setAttribute('background-color', newBackgroundColor);
    }

    setFontFamily(newFontFamily) {
        this.setAttribute('font-family', newFontFamily);
    }

    setFontSize(newFontSize) {
        this.setAttribute('font-size', newFontSize);
    }

    disable() {
        const button = this.shadowRoot.querySelector('.custom-button');
        if (button) {
            button.disabled = true;
        }
    }

    enable() {
        const button = this.shadowRoot.querySelector('.custom-button');
        if (button) {
            button.disabled = false;
        }
    }
}

// Register the custom element
customElements.define('custom-button', CustomButton);

// Example usage and event handling
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for all custom buttons
    document.addEventListener('button-click', function(e) {
        console.log('Button clicked:', e.detail);
        
        // You can add custom behavior here
        // For example, show an alert or update UI
        if (e.detail.text === 'Click Me!') {
            alert('Hello from the custom button!');
        }
    });
});
