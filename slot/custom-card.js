class CustomCard extends HTMLElement {
    constructor() {
        super();
        
        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Define the HTML structure with slots
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    border: 2px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 16px;
                    max-width: 400px;
                }

                .title {
                    color: #2c3e50;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 8px;
                }

                .content {
                    padding: 16px 0;
                }

                .footer {
                    border-top: 1px solid #eee;
                    padding-top: 8px;
                    color: #666;
                    font-size: 0.9em;
                }
            </style>

            <div class="card">
                <div class="title">
                    <slot name="title">Default Title</slot>
                </div>
                <div class="content">
                    <slot name="content">Default Content</slot>
                </div>
                <div class="footer">
                    <slot name="footer">Default Footer</slot>
                </div>
            </div>
        `;
    }
}

// Register the custom element
customElements.define('custom-card', CustomCard); 