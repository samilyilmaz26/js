import { ElbyId } from "./util.js";
import "./users-webcomponent/users-crud.js";
 

const routes = {
  "/": () => `<h1>Home Page</h1><p>Welcome to the home page!</p>`,
  "/about": () => `<h1>About Page</h1><p>This is the about section.</p>`,
  "/contact": () =>
    `<h1>Contact Page</h1><p>Contact us at contact@example.com.</p>`,
    '/samil': () => `<h1>Şamil  Page</h1> `,
    '/users': () => `<users-crud></users-crud>`,
};

function router() {
  const path = location.hash.slice(1) || '/';
  const route = routes[path];
  ElbyId.get('app').innerHTML = route
  ? route()
  : `<h1>404 - Not Found</h1>`;
  // document.getElementById('app').innerHTML = route
  //   ? route()
  //   : `<h1>404 - Not Found</h1>`;
}
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
