// router.js
const routes = {
  "/": "<h2>Welcome to Home Page</h2><p>This is the home content.</p>",
  "/about": "<h2>About Us</h2><p>Some info about this project.</p>",
  "/contact": "<h2>Contact</h2><p>Get in touch!</p>",
  "/state" : "<h2>State</h2><p>State</p>",
  "/calculator": "<simple-calculator></simple-calculator>",
};

function router() {
  const hash = window.location.hash.replace("#", "") || "/";
  const content = document.getElementById("content");
  content.innerHTML = routes[hash] || "<h2>404 - Page Not Found</h2>";
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
 