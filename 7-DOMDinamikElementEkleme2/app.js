const drinks = document.getElementById("drinks")
const drinks2 = document.getElementsByClassName("list-group")
const newdrink = document.createElement("li")
newdrink.className = "list-group-item"
newdrink.appendChild(document.createTextNode("Yeşil Çay"))
drinks.appendChild(newdrink)

val = drinks
console.log(drinks)
console.log(newdrink)
console.log(drinks2)