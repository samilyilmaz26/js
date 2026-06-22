class CalculatorComponent extends HTMLElement {
    constructor() {
        super();
        
        // Create shadow DOM
        this.attachShadow({ mode: 'open' });
        
        // Load external CSS
        this.loadStyles();
        
        // Define the component's HTML structure
        this.shadowRoot.innerHTML = `
            <div class="container">
                <div class="calculator">
                    <h2 class="calculator-title text-center">Calculator</h2>
                    
                    <div class="input-group">
                        <label for="s1">Birinci Sayı</label>
                        <input type="number" id="s1" placeholder="İlk sayıyı girin">
                    </div>
                    
                    <div class="input-group">
                        <label for="s2">İkinci Sayı</label>
                        <input type="number" id="s2" placeholder="İkinci sayıyı girin">
                    </div>
                    
                    <div class="button-group">
                        <button class="btn btn-primary" id="pls">+</button>
                        <button class="btn btn-secondary" id="min">-</button>
                        <button class="btn btn-success" id="mul">×</button>
                        <button class="btn btn-warning" id="div">÷</button>
                    </div>
                    
                    <div class="input-group result-group">
                        <label for="result">Sonuç</label>
                        <input type="text" id="result" readonly placeholder="Sonuç burada görünecek">
                    </div>
                </div>
            </div>
        `;
        
        // Bind methods to preserve 'this' context
        this.plus = this.plus.bind(this);
        this.minus = this.minus.bind(this);
        this.multiply = this.multiply.bind(this);
        this.divide = this.divide.bind(this);
    }
    
    // Method to load external CSS
    async loadStyles() {
        try {
            const response = await fetch('./style.css');
            const cssText = await response.text();
            
            // Create a style element and add the CSS
            const style = document.createElement('style');
            style.textContent = cssText;
            this.shadowRoot.appendChild(style);
        } catch (error) {
            console.error('Failed to load styles:', error);
            // Fallback: add minimal styles if external CSS fails to load
            const fallbackStyle = document.createElement('style');
            fallbackStyle.textContent = `
                :host {
                    display: block;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .calculator {
                    max-width: 400px;
                    margin: 2rem auto;
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 2rem;
                }
            `;
            this.shadowRoot.appendChild(fallbackStyle);
        }
    }
    
    connectedCallback() {
        // Add event listeners when component is connected to DOM
        this.shadowRoot.getElementById("pls").addEventListener("click", this.plus);
        this.shadowRoot.getElementById("min").addEventListener("click", this.minus);
        this.shadowRoot.getElementById("mul").addEventListener("click", this.multiply);
        this.shadowRoot.getElementById("div").addEventListener("click", this.divide);
    }
    
    disconnectedCallback() {
        // Clean up event listeners when component is removed
        this.shadowRoot.getElementById("pls").removeEventListener("click", this.plus);
        this.shadowRoot.getElementById("min").removeEventListener("click", this.minus);
        this.shadowRoot.getElementById("mul").removeEventListener("click", this.multiply);
        this.shadowRoot.getElementById("div").removeEventListener("click", this.divide);
    }
    
    // Helper method to get input values
    getInputValue(inputId) {
        const element = this.shadowRoot.getElementById(inputId);
        const value = element ? element.value : "0";
        return parseFloat(value) || 0;
    }
    
    // Calculator operations
    plus() {
        const s1 = this.getInputValue("s1");
        const s2 = this.getInputValue("s2");
        const result = s1 + s2;
        this.shadowRoot.getElementById("result").value = result;
    }
    
    minus() {
        const s1 = this.getInputValue("s1");
        const s2 = this.getInputValue("s2");
        const result = s1 - s2;
        this.shadowRoot.getElementById("result").value = result;
    }
    
    multiply() {
        const s1 = this.getInputValue("s1");
        const s2 = this.getInputValue("s2");
        const result = s1 * s2;
        this.shadowRoot.getElementById("result").value = result;
    }
    
    divide() {
        const s1 = this.getInputValue("s1");
        const s2 = this.getInputValue("s2");
        if (s2 === 0) {
            this.shadowRoot.getElementById("result").value = "Error: Division by zero";
            return;
        }
        const result = s1 / s2;
        this.shadowRoot.getElementById("result").value = result;
    }
}

// Register the custom element
customElements.define('calculator-component', CalculatorComponent);
