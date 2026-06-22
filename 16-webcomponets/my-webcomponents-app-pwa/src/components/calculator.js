class SimpleCalculator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./bs.css");

    const container = document.createElement("div");
    container.className = "container-fluid py-4";
    container.innerHTML = `
      <div class="row justify-content-start">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-3">Calculator</h5>
              <input type="text" class="form-control mb-3 text-end" id="display" readonly value="0" />
              <div class="d-grid gap-2">
                <div class="row g-2">
                  <div class="col-3"><button data-action="clear" class="btn btn-outline-danger w-100">C</button></div>
                  <div class="col-3"><button data-action="del" class="btn btn-outline-secondary w-100">DEL</button></div>
                  <div class="col-3"><button data-value="/" class="btn btn-outline-primary w-100">÷</button></div>
                  <div class="col-3"><button data-value="*" class="btn btn-outline-primary w-100">×</button></div>
                </div>
                <div class="row g-2">
                  <div class="col-3"><button data-value="7" class="btn btn-light w-100">7</button></div>
                  <div class="col-3"><button data-value="8" class="btn btn-light w-100">8</button></div>
                  <div class="col-3"><button data-value="9" class="btn btn-light w-100">9</button></div>
                  <div class="col-3"><button data-value="-" class="btn btn-outline-primary w-100">−</button></div>
                </div>
                <div class="row g-2">
                  <div class="col-3"><button data-value="4" class="btn btn-light w-100">4</button></div>
                  <div class="col-3"><button data-value="5" class="btn btn-light w-100">5</button></div>
                  <div class="col-3"><button data-value="6" class="btn btn-light w-100">6</button></div>
                  <div class="col-3"><button data-value="+" class="btn btn-outline-primary w-100">+</button></div>
                </div>
                <div class="row g-2">
                  <div class="col-3"><button data-value="1" class="btn btn-light w-100">1</button></div>
                  <div class="col-3"><button data-value="2" class="btn btn-light w-100">2</button></div>
                  <div class="col-3"><button data-value="3" class="btn btn-light w-100">3</button></div>
                  <div class="col-3" rowspan="2"><button data-action="equals" class="btn btn-primary w-100 h-100">=</button></div>
                </div>
                <div class="row g-2">
                  <div class="col-9"><button data-value="0" class="btn btn-light w-100">0</button></div>
                  <div class="col-3"><button data-value="." class="btn btn-light w-100">.</button></div>
                  <div class="col-3"><button data-action="neg" class="btn btn-outline-secondary w-100">±</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(container);

    this.displayEl = this.shadowRoot.getElementById("display");
    this.current = "0";
    this.previous = null;
    this.operator = null;

    this.shadowRoot.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const value = btn.getAttribute("data-value");
      const action = btn.getAttribute("data-action");
      if (value !== null) {
        this.inputDigit(value);
        return;
      }
      if (action === "clear") {
        this.clearAll();
        return;
      }
      if (action === "del") {
        this.deleteLast();
        return;
      }
      if (action === "equals") {
        this.performEquals();
        return;
      }
      if (action === "neg") {
        this.toggleSign();
        return;
      }
    });
  }

  connectedCallback() {
    this.updateDisplay();
    this.keyHandler = (e) => this.handleKey(e);
    window.addEventListener("keydown", this.keyHandler);
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this.keyHandler);
  }

  updateDisplay() {
    this.displayEl.value = this.current;
  }

  inputDigit(d) {
    if (/[+\-*/]/.test(d)) {
      this.setOperator(d);
      return;
    }
    if (d === ".") {
      if (!this.current.includes(".")) this.current += ".";
      this.updateDisplay();
      return;
    }
    if (this.current === "0") this.current = d;
    else this.current += d;
    this.updateDisplay();
  }

  setOperator(op) {
    if (this.operator && this.previous !== null) {
      this.compute();
    }
    this.operator = op;
    this.previous = parseFloat(this.current);
    this.current = "0";
    this.updateDisplay();
  }

  compute() {
    const a = this.previous;
    const b = parseFloat(this.current);
    if (a === null || isNaN(a) || isNaN(b)) return;
    let result = 0;
    switch (this.operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = b === 0 ? NaN : a / b;
        break;
      default:
        result = b;
    }
    this.current = String(Number.isFinite(result) ? +result.toFixed(10) : "Error");
    this.previous = null;
    this.operator = null;
    this.updateDisplay();
  }

  performEquals() {
    if (this.operator === null) return;
    this.compute();
  }

  clearAll() {
    this.current = "0";
    this.previous = null;
    this.operator = null;
    this.updateDisplay();
  }

  deleteLast() {
    if (this.current.length <= 1) this.current = "0";
    else this.current = this.current.slice(0, -1);
    this.updateDisplay();
  }

  toggleSign() {
    if (this.current === "0" || this.current === "Error") return;
    if (this.current.startsWith("-")) this.current = this.current.slice(1);
    else this.current = "-" + this.current;
    this.updateDisplay();
  }

  handleKey(e) {
    const key = e.key;
    if ((/^[0-9]$/).test(key)) {
      this.inputDigit(key);
      return;
    }
    if (["+", "-", "*", "/"].includes(key)) {
      this.setOperator(key);
      return;
    }
    if (key === ".") {
      this.inputDigit(".");
      return;
    }
    if (key === "Enter" || key === "=") {
      e.preventDefault();
      this.performEquals();
      return;
    }
    if (key === "Backspace") {
      this.deleteLast();
      return;
    }
    if (key.toLowerCase() === "c") {
      this.clearAll();
    }
  }
}

customElements.define("simple-calculator", SimpleCalculator);


