const drinkList = document.querySelector("ul.list-group")
const drinks =  document.querySelectorAll("li.list-group-item")

// drinks[2].remove()
// drinks[3].remove()
// drinks[4].remove()
drinkList.removeChild(drinkList.lastElementChild)
drinkList.removeChild(drinks[0])

console.log(drinkList)

console.log(drinks)