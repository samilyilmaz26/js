const drinkList = document.querySelector("ul.list-group")
const selectedrink= document.querySelectorAll("li.list-group-item")[2]

const newel =  document.createElement("li")
newel.className="list-group-item"
newel.textContent = "Pepsi"
drinkList.replaceChild(newel,selectedrink)

console.log(drinkList)
console.log(newel)