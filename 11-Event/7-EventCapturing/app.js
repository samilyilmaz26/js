drinktable = document.querySelector(".table")

drinktable.addEventListener("click" ,log)

function log(e) {
  console.log(e.target)
}

console.log(drinktable)