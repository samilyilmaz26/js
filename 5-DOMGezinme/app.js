let value

const drinks = document.querySelector(".list-group")
const  cay = document.querySelector(".list-group-item:nth-child(2)")

value = drinks
value = drinks.childNodes // text dahil
value = drinks.children // yanlızca elementler
value = drinks.children[1]
value = drinks.firstElementChild
value = drinks.lastElementChild
value = drinks.children.length
value = drinks.childElementCount
drinks.children[1].textContent = "Yeşil Çay"

const container = document.querySelector(".table").children[1].children[1].children[2].textContent ="Meksika"
value = container

value = drinks.parentElement.parentElement.parentElement.id

value = drinks.children[1]
value = drinks.children[1].previousElementSibling
value = drinks.children[1].nextElementSibling
console.log(value)