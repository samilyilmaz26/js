{
  /* <tr = "detail">
<td>Süt</td>
</tr>
<tr>
<td>Süt</td>
</tr> */
}
const trdetail = document.getElementById("detail");
const productInput = document.querySelector("#ad");
const productForm = document.getElementById("productForm");
const topElement = document.querySelectorAll(".col-md-7")[0];

// const alertElement = document.getElementById("msg")
const alertElement = document.createElement("div");

Listener();
function Listener() {
  console.log(productForm);
  document.addEventListener("DOMContentLoaded", getAll);
  productForm.addEventListener("submit", submit);
}
function getAll() {
  plist = getStorage();
  plist.forEach(function (el) {
    addTdElement(el);
  });
}
function getStorage() {
  let plist = localStorage.getItem("pstore");
  if (plist === null) {
    return [];
  }
  return JSON.parse(plist);
}
function addtrElement(product) {
  const tdElement = document.createElement("td");
  tdElement.textContent = product;
  trdetail.appendChild(tdElement);
}
function submit(e) {
  const product = productInput.value;
  if (product === "") {
    showMessage("alert alert-danger", "Personel Boş Olamaz");
  } else {
    addtrElement(product)
  e.preventDefault();

    addStorage(product);
    // getStorage()
    showMessage("alert alert-success", "Personel Kaydedildi ");
  }
 
}
function showMessage(cls, msg) {
   
  alertElement.className = cls;
  alertElement.textContent = msg;
  console.log(alertElement)
  topElement.appendChild(alertElement);

  setTimeout(function () {
    topElement.removeChild(alertElement)
  }, 1000);
}
