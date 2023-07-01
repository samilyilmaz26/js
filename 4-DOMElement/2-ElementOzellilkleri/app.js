element = document.querySelector("#link")

console.log(element)
console.log(element.id)
console.log(element.className)
console.log(element.classList)
console.log(element.classList[1])
console.log(element.textContent)
console.log(element.innerHTML)
console.log(element.href)
console.log(element.style)

element.className ="btn btn-warning"
element.style.backgroundColor ='white'
element.style.marginLeft = "100px";
element.href="www.google.com"
element.target = "_blank"
element.innerHTML = "<h3 style='color:red'>deneme</h3>"
var elements = document.querySelectorAll(".list-group-item")
elements.forEach(element => {
    element.style.color= 'red'
    element.style.background ='#000'
});

element = document.querySelector("li:first-child")
element = document.querySelector("li:last-child")
element = document.querySelector("li:nth-child(2)")
element = document.querySelectorAll("li:nth-child(odd)")
console.log(element)