 // navbar.js
class NavBar extends HTMLElement {
  constructor() {
    super();

    // Create Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Create link to external CSS
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./bs.css");

    // Create nav structure
    const nav = document.createElement("nav");
    nav.classList.add("nav-bar");
    nav.innerHTML = `
    <nav class="nav">
  <a class="nav-link active" aria-current="page" href="#">Home</a>
  <a class="nav-link" href="#/about">About</a>
  <a class="nav-link" href="#/contact">Contact</a>
  <a class="nav-link" href="#/state">State</a>
  <a class="nav-link" href="#/calculator">Calculator</a>
  <a class="nav-link" href="#/samil">Samil</a>
</nav>
</nav>
    `;
       
    // Append CSS + nav to shadow DOM
    shadow.appendChild(link);
    shadow.appendChild(nav);
  }
}

customElements.define("nav-bar", NavBar);

